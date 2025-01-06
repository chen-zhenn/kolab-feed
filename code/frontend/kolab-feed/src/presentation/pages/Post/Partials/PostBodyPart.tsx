import { 
    useEffect, 
    useState, 
} from 'react'

import { 
    useRevalidator,
    useNavigate,
    useLocation,
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
    Modal,
    Form,
} from '@/presentation/components'

import { IPostPage } from '../types'

export interface IUserDataComment extends IUserData {
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
    const nav = useNavigate()
    const { pathname } = useLocation()
    const { revalidate, state } = useRevalidator()
    const { launchToast } = Utils
    const posts = data
    const [userCommentData, setUserCommentData] = useState<IUserDataComment[]>([])
    const [commentFieldLabel, setCommentFieldLabel] = useState<string>('Adicionar comentário')
    const [commentData, setCommentData] = useState<ICommentData>()
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!posts || !posts.length) return
        const comments = posts.flatMap((post) => post.comments || [])
        loadUserData(comments)
    }, [posts])

    function handleUpdateComment(userCommentData: IUserDataComment): void {
        
        if(
            !userCommentData ||
            !userCommentData.comment_id ||
            !Object.keys(userCommentData).length
        ) return

        const { 
            comment_id: id, 
            comment_body: body, 
            user_id, 
            post_id, 
        } = userCommentData

        setCommentData({
            id,
            body,
            user_id,
            post_id,
        })
        setOpen(true)
    }
    
    async function loadUserData(comments: ICommentData[]): Promise<void> {
        const promiseData: 
        Promise<IUserDataComment | undefined>[] = 
        comments.map(async (comment) => {

            if (!comment.user_id) return
            const response = await user.getById(comment.user_id)

            if (response && response.status === HttpStatusCode.success) 
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
        setUserCommentData(userData.filter(Boolean) as IUserDataComment[])
    }

    async function handleConfirmBodyComment(
        details: ValueChangeDetails, 
        post_id: number
    ): Promise<IHttpResponse<ICommentData[]> | any> {        
        if(!details || !details.value.length) return
        
        const payload = { post_id, body: details.value }
        setLoading(true)

        try {
            const response = await comment.create(payload)
            if(response) {
                launchToast(response)
                setTimeout(() => revalidate(), 250)
            }
        } catch (error) {
            const response = {
                status: HttpStatusCode.servererror,
                statusText: 'error',
                message: HttpStatusMessages.servererror,
            }
            return launchToast(response)
        } finally {
            setCommentFieldLabel('Adicionar comentário')
            setLoading(false)
        }
    }

    async function handleDeleteComment(comment_id?: number): Promise<void> {
        
        if(!comment_id) return
        setLoading(true)
        
        try {
            const response = await comment.delete({  id: comment_id })
            if(response) {
                launchToast(response)
                setTimeout(() => revalidate(), 250)
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

    function renderCommentContent(post: IPost): React.ReactNode {

        if(!userCommentData.length) return
        
        return (
            <>
                {
                    userCommentData
                        .filter(userComment => userComment.post_id === post.id)
                        .map((userComment, index) => (
                            <PostComment.Container key={`${index}-user-${userComment.id}`}>

                                <PostComment.Header>
                                    <PostHeader.Container key={userComment.id}>
                                        <PostHeader.Avatar imageSource={userComment.avatar} />
                                        <PostHeader.Title title={userComment.username} />
                                        { 
                                            !loading && 
                                            (
                                                <PostHeader.Action 
                                                    action={true} 
                                                    handleEdit={() => handleUpdateComment(userComment)}
                                                    handleDelete={() => handleDeleteComment(userComment.comment_id)} 
                                                />
                                            ) 
                                        }
                                    </PostHeader.Container>
                                </PostComment.Header>

                                <PostComment.Content 
                                    comment={userComment?.comment_body} 
                                />

                            </PostComment.Container>
                        ))
                }
            </>
          )
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
            <Modal.Container 
                open={open} 
                closeOnInteractOutside={true}
                scrollBehavior='inside'
                handlers={{
                    onOpenChange: (details) => setOpen(details.open),
                    onExitComplete: () => {
                        nav(`${pathname.replace(/\/(add|edit|delete|posts|user)\/?.*/, '')}`)
                    }
                }}
            >
                <Modal.Header>
                    <Modal.Title title='Atualizar Comentário' />
                </Modal.Header>

                <Modal.Content>
                    <Form.Comment 
                        data={commentData}
                        handlers={{ onCancel: () => setOpen(false) }} 
                    />
                </Modal.Content>
            </Modal.Container>
        </>
    )
}