import { 
    // useEffect, 
    // useState 
} from 'react'

import { 
    useLoaderData,
    useNavigate,
    useLocation,
} from 'react-router'

// import { 
//     LuCheck,
//     LuPencilLine, 
//     LuX,
// } from 'react-icons/lu'

//  import { 
//     Editable, 
//     IconButton,
// } from '@chakra-ui/react'

import { ValueChangeDetails } from '@zag-js/editable'

import { 
    IComments,
    IPost,
    // IPostContent, 
} from '@/domain/models'

import { 
    IHttpResponse,
    HttpStatusCode,
} from '@/infra'

import { 
    PostCard,
    PostHeader,
    PostContent,
    PostComment,
    EditableField,
} from '@/presentation/components'

import {
    Header, 
    Section, 
} from './styles'

export default function Post(){

    const nav = useNavigate()
    const { pathname } = useLocation()
    const response: IHttpResponse<IPost[]> = useLoaderData()
    
    if (
        response.status !== HttpStatusCode.success || 
        !response.data.length
    ) return
    
    const posts: IPost[] = response.data
    const mockUser = {
        avatar: 'https://res.cloudinary.com/dqcweavkb/image/upload/c_pad,w_250,h_250/v1734624200/dev-animeedits__frame-image-1_d3yrfg.png',
        username: 'john.doe'
    } 

    function postHeader(post: IPost): React.ReactNode {
        return (
            <PostHeader.Container>
                <PostHeader.Avatar 
                    imageSource={post?.users?.avatar} 
                    imageName={post?.users?.username}
                    onClick={() => nav(`/posts/${post.userId}`)} 
                />
                <PostHeader.Title 
                    title={post?.users?.username}
                    onClick={() => nav(`/posts/${post.userId}`)} 
                />
                <PostHeader.Action 
                    action={true} 
                    handleEdit={() => nav(`${pathname.replace(/\/delete|\/edit$/, '')}/edit`)}
                    handleDelete={() => nav(`${pathname.replace(/\/delete|\/edit$/, '')}/delete`)}  
                />
            </PostHeader.Container>
        )
    }

    function postContent(post: IPost): React.ReactNode {
        return (
            <PostContent.Container>
                <PostContent.Title title={post.title} />
                <PostContent.Description description={post.body} />
                <PostContent.Image imageSource={post.image} />
            </PostContent.Container>
        )
    }

    function postComment(comment: IComments): React.ReactNode {
        const post = posts.filter(item => item.userId === comment.userId)[0]
        return (
            <PostComment.Container key={comment.id}>
                <PostComment.Header>{  postHeader(post) }</PostComment.Header>
                <PostComment.Content contentValue={comment.body} />
            </PostComment.Container>
        )
    }

    function handleCommitBodyPost(details: ValueChangeDetails): void {
        console.log('handleCommitPost...')
        console.log(details)
    }
    
    return (
        <>
            <Header>
                <PostCard.Container>
                    <PostCard.Header>
                        <PostHeader.Container>
                            <PostHeader.Avatar 
                                imageSource={mockUser.avatar} 
                                imageName={mockUser.username} 
                            />
                            <aside style={{ flexGrow: 1 }}>
                                <EditableField
                                    handlers={{ onSubmit: handleCommitBodyPost }} 
                                    labelField='Comece a escrever sua publicação' 
                                    fieldType='text'
                                    triggers={{
                                        edit: {
                                            view: true,
                                            button: null
                                        },
                                        cancel:{
                                            view: true,
                                            button: null 
                                        },
                                        submit: {
                                            view: true,
                                            button: null  
                                        }
                                    }} 
                                />
                            </aside>
                        </PostHeader.Container>
                    </PostCard.Header>
                </PostCard.Container>
            </Header>
            <Section>
                {
                    posts.map(post => (
                        <PostCard.Container 
                            key={post.id}
                        >

                            <PostCard.Header divider={true}>{ postHeader(post) }</PostCard.Header>
                            <PostCard.Content 
                                content={ postContent(post) }
                                comment={
                                    post.comments && !!post.comments?.length ? 
                                    (
                                        post.comments.map(comment => postComment(comment))
                                    ) : (
                                        <PostComment.Content />
                                    )
                                } 
                            />
                        </PostCard.Container>
                    ))
                }
            </Section>
        </>
    )
}