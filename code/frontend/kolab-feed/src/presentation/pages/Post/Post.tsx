import { useState } from 'react'

import { 
    useLoaderData,
    useNavigate,
    useLocation,
    useParams,
    useRevalidator,
} from 'react-router'

import { 
    Flex,
} from '@chakra-ui/react'

import { ValueChangeDetails } from '@zag-js/editable'

import {
    IPost,
    IPostData, 
} from '@/domain/models'

import { 
    IHttpResponse,
    HttpStatusCode,
} from '@/infra'

import { HttpStatusMessages } from '@/main/services'

import { makePost } from '@/main/usecases'
import { Utils } from '@/presentation/shared'

import { 
    PostHeader,
    PostContent,
    Modal,
    Form,
    Toaster,
    Action,
} from '@/presentation/components'

import { Partial } from './Partials'
import { CrudAction } from './types'

export default function Post() {

    const { revalidate, state } = useRevalidator()
    const nav = useNavigate()
    const { pathname } = useLocation()
    const { id: post_id } = useParams()
    const response: IHttpResponse<IPost[]> = useLoaderData()
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [hideHeader] = useState<boolean>(/^\/posts\/user\/.*/.test(pathname))
    const [action, setAction] = useState<CrudAction>('add')
    const [modalOptions, setModalOptions] = useState<{ title: string }>({
        title: 'Complete o Cadastro'
    })
    const [postData, setPostData] = useState<IPostData>({
        title: '',
        body: 'Comece a escrever sua publicação',
        image: ''
    })

    const { launchToast } = Utils
    let posts: IPost[] = []

    try {
        
        if(response && response.status === 200) 
            if (response.data) posts = response?.data
    } catch (error) {
        const response = {
            status: HttpStatusCode.servererror,
            statusText: 'error',
            message: HttpStatusMessages.servererror,
        }
        launchToast(response)
    }

    function handlePostHeaderBody(post: IPost): React.ReactNode {
        return (
            <PostHeader.Container>
                <PostHeader.Avatar 
                    imageSource={post?.user?.avatar} 
                    imageName={post?.user?.username}
                    onClick={() => nav(`${pathname.replace(/\/(feed|add|edit|delete|posts|user)\/?.*/, '')}/posts/user/${post.user_id}`)} 
                />
                <PostHeader.Title 
                    title={post?.user?.username}
                    onClick={() => nav(`${pathname.replace(/\/(feed|add|edit|delete|posts|user)\/?.*/, '')}/posts/user/${post.user_id}`)} 
                />
                <PostHeader.Action 
                    action={true} 
                    handleEdit={() => handleUpdatePost(post)}
                    handleDelete={() => handleDeletePost(post)}  
                />
            </PostHeader.Container>
        )
    }

    function handlePostContentBody(post: IPost): React.ReactNode {
        return (
            <PostContent.Container>
                <PostContent.Title title={post.title} />
                <PostContent.Description description={post.body} />
                <PostContent.Image imageSource={post.image} />
            </PostContent.Container>
        )
    }

    function handleModalContentBody(action: CrudAction): React.ReactNode {
        const content = {
            add: (
                <Form.Post 
                    data={postData}
                    handlers={{ onCancel: () => setOpen(false) }} 
                />
            ),
            edit: (
                <Form.Post 
                    data={postData}
                    handlers={{ onCancel: () => setOpen(false) }} 
                />
            ),
            delete: (
                <Flex gap='1rem' justifyContent='center'>
                    <Action.Btn 
                        actionType='confirm'
                        label='Confirmar'
                        loadingLabel='Deletando'
                        state={{ 
                            disabled: loading,
                            loading: loading,
                        }}  
                        handlers={{ 
                            onConfirm: async () => await handleConfirmDeletePost() 
                        }} 
                    />

                    <Action.Btn 
                        actionType='cancel'
                        state={{ 
                            disabled: loading,
                        }}  
                        handlers={{ 
                            onCancel: () => setOpen(false) 
                        }} 
                    />
                </Flex>
            )
        }

        return content[action ?? 'add']
    }

    function handleConfirmBodyPost(details: ValueChangeDetails): void {
        nav(`${pathname.replace(/\/(add|edit|delete)\/?.*/, '')}/add`)
        setPostData(prevData => ({
            ...prevData,
            body: details.value,
        }))
        setAction('add')
        setOpen(true)
    }

    function handleUpdatePost(post: IPost): void {
        nav(`${pathname.replace(/\/(add|edit|delete)\/?.*/, '')}/edit/${post.id}`)
        const { title, body, image } = post
        setPostData(prevData => ({
            ...prevData,
            title,
            body,
            image,
            user_id: post.user_id,
        }))
        setAction('edit')
        setOpen(true)
    }

    function handleDeletePost(post: IPost): void {
        nav(`${pathname.replace(/\/(add|edit|delete)\/?.*/, '')}/delete/${post.id}`)
        setAction('delete')
        setModalOptions({ title: 'Deletar Post?' })
        setOpen(true)
    }

    async function handleConfirmDeletePost(): Promise<IHttpResponse<IPostData[]> | any> {
        if (!post_id) return
        const post = makePost()
        setLoading(true)

        try {
            const response = await post.delete({ id: parseInt(post_id) })
            if(response) {
                launchToast(response)
                revalidate()
                if(state !== 'loading') return response
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
            setOpen(false)
            setModalOptions({ title: 'Complete o Cadastro' })
        } 
    }

    
    return (
        <>
            {
                !hideHeader && (
                    <Partial.PostHeader
                        data={posts}
                        postData={postData} 
                        handlers={{ 
                            handlePostHeaderBody,
                            handlePostContentBody,
                            handleConfirmBodyPost,
                        }} 
                    />
                )
            }

            {
                !!posts.length && (
                    <Partial.PostBody
                    data={posts}
                    handlers={{
                        handlePostHeaderBody,
                        handlePostContentBody,
                        handleConfirmBodyPost,
                    }} 
                />
                )
            }

            <Modal.Container 
                open={open}
                closeOnInteractOutside={true}
                scrollBehavior='inside'
                handlers={{
                    onOpenChange: (details) => setOpen(details.open),
                    onExitComplete: () => {
                        nav(`${pathname.replace(/\/(add|edit|delete|posts|user)\/?.*/, '')}`)
                        setPostData({ title: '', body: '', image: '' })
                    }
                }}
            >
                <Modal.Header>
                    <Modal.Title title={modalOptions.title} />
                </Modal.Header>
                <Modal.Content>
                    {handleModalContentBody(action)}
                </Modal.Content>
            </Modal.Container>
            <Toaster />            
        </>
    )
}