import { 
    useEffect, 
    useState, 
} from 'react'

import { 
    useRevalidator,
} from 'react-router'

import { ValueChangeDetails } from '@zag-js/editable'

import {
    IPost,
    ICommentData,
    IUserData, 
} from '@/domain/models'

import {
    IHttpResponse, 
    HttpStatusCode,
} from '@/infra'

import {
    makeUser,
} from '@/main/usecases'

import { HttpStatusMessages } from '@/main/services'

import { makeComment } from '@/main/usecases'

import { Utils } from '@/presentation/shared'

import {
    PostCard,
    PostHeader,
    PostComment,
    EditableField,
} from '@/presentation/components'

import { IPostPage } from '../types'

export interface IUserDataComments extends IUserData {
    post_id?: number;
    comment_id?: number;
    comment_body?: string;
}

export default function PostBodyPart({ 
    data, 
    handlers 
}: IPostPage){

    const user = makeUser()
    const comment = makeComment()
    const { revalidate, state } = useRevalidator()
    const { launchToast } = Utils
    const posts = data
    const [userData, setUserData] = useState<IUserDataComments[]>([])
    const [commentFieldLabel, setCommentFieldLabel] = useState<string>('Adicionar comentário')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!posts || !posts.length) return
        const comments = posts.flatMap((post) => post.comments || [])
        loadUserData(comments)
    }, [posts])

    
    async function loadUserData(comments: ICommentData[]): Promise<void> {
        const promiseData: Promise<IUserDataComments | undefined>[] = comments.map(async (comment) => {

            if (!comment.user_id) return
            const response = await user.getById(comment.user_id)

            if (response && response.status === 200) 
                if (response.data && response.data.length){
                    const data = {
                        ...response.data[0],
                        post_id: comment.post_id,
                        comment_id: comment.id,
                        comment_body: comment.body 
                    }
                    return data   
                } 
        })

        const userData = await Promise.all(promiseData)
        setUserData(userData.filter(Boolean) as IUserDataComments[])
    }

    function renderCommentContent(post: IPost): React.ReactNode {

        if(!userData.length) return
        
        return (
            <>
                {
                    userData
                        .filter(user => user.post_id === post.id)
                        .map((user, index) => (
                            <PostComment.Container key={`${index}-user-${user.id}`}>

                                <PostComment.Header>
                                    <PostHeader.Container key={user.id}>
                                        <PostHeader.Avatar imageSource={user.avatar} />
                                        <PostHeader.Title title={user.username} />
                                        <PostHeader.Action 
                                            action={true} 
                                            handleEdit={() => console.log(`Editar comentário: ${user.comment_id}`)}
                                            handleDelete={() => console.log(`Deletar comentário: ${user.comment_id}`)} 
                                        />
                                    </PostHeader.Container>
                                </PostComment.Header>

                                <PostComment.Content 
                                    comment={user?.comment_body} 
                                />

                            </PostComment.Container>
                        ))
                }
            </>
          )
    }

    async function handleConfirmBodyComment(details: ValueChangeDetails, post_id: number): Promise<IHttpResponse<ICommentData[]> | any> {        
        if(!details || !details.value.length) return
        
        const payload = { post_id, body: details.value }
        setLoading(true)

        try {
            const response = await comment.create(payload)
            if(response) {
                launchToast(response)
                setTimeout(() => revalidate(), 350)
            }
        } catch (error) {
            const response = {
                status: HttpStatusCode.servererror,
                statusText: 'error',
                message: HttpStatusMessages.servererror,
            }
            return launchToast(response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {
               posts && posts.map(post => (
                    <PostCard.Container key={post.id}>

                        <PostCard.Header divider={true}>
                            {handlers?.handlePostHeaderBody(post)}
                        </PostCard.Header>

                        <PostCard.Content 
                            content={handlers?.handlePostContentBody(post)}
                            comment={renderCommentContent(post)} 
                        />
                        <PostCard.Footer>
                            {
                                !loading && 
                                (
                                    <EditableField 
                                        fieldType='text'
                                        labelField={commentFieldLabel}  
                                        handlers={{
                                            onConfirm: 
                                                (details: ValueChangeDetails) => 
                                                    handleConfirmBodyComment(details, post.id),
                                        }}
                                        triggers={{
                                            edit: {
                                                view: true,
                                                button: null
                                            },
                                            cancel:{
                                                view: true,
                                                button: null 
                                            },
                                            confirm: {
                                                view: true,
                                                button: null  
                                            }
                                        }}  
                                    />
                                )
                            }
                        </PostCard.Footer>
                    </PostCard.Container>
               ))
            }
        </>
    )
}