import { ValueChangeDetails } from '@zag-js/editable'

import { 
    PostCard,
    PostComment,
} from '@/presentation/components'

import { IPostPage } from '../types'
import { ICommentData, IPost } from '@/domain/models'
import { useEffect, useState } from 'react'

export default function PostBodyPart({ 
    data, 
    handlers 
}: IPostPage){

    const posts = data

    const [commentData, setCommentData] =  useState<ICommentData>()
    
    function handleSubmitComment() {
        console.log('handleSubmitComment...')
        console.log('=> commentData: ', commentData)
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
                            comment={
                                post.comments && !!post.comments?.length ? 
                                (
                                    post.comments.map(comment => handlers?.handlePostCommentBody(comment))
                                ) : (
                                    <PostComment.Content
                                        onConfirmComment={(details: ValueChangeDetails) => {
                                            setCommentData({
                                                user_id: post.user_id,
                                                post_id: post.id,
                                                body: details.value,
                                            })
                                        }} 
                                        onSubmitComment={handleSubmitComment}
                                    />
                                )
                            } 
                        />
                    </PostCard.Container>
               ))
            }
        </>
    )
}