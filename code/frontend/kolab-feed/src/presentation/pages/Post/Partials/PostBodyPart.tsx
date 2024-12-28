import { 
    PostCard,
    PostComment,
} from '@/presentation/components'

import { IPostPage } from '../types'

export default function PostBodyPart({ 
    data, 
    handlers 
}: IPostPage){

    const posts = data

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
                            comment={
                                post.comments && !!post.comments?.length ? 
                                (
                                    post.comments.map(comment => handlers?.handlePostCommentBody(comment))
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