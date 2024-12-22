import { 
    useLoaderData,
    useNavigate,
    useLocation,
} from 'react-router'

import { 
    IComments,
    IPost, 
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
} from '@/presentation/components'

export default function Post(){

    const nav = useNavigate()
    const { pathname } = useLocation()
    const response: IHttpResponse<IPost[]> = useLoaderData()
    
    if (
        response.status !== HttpStatusCode.success || 
        !response.data.length
    ) return
    
    const posts: IPost[] = response.data

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
    
    return (
        <>
            {
                posts.map(post => (
                    <PostCard.Container 
                        key={post.id}
                    >

                        <PostCard.Header>{ postHeader(post) }</PostCard.Header>
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
        </>
    )
}