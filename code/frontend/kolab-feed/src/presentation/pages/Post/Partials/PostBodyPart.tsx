import { useState } from 'react'

import { ValueChangeDetails } from '@zag-js/editable'

import {
    IPost,
    ICommentData, 
} from '@/domain/models'

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
    const [commentData, setCommentData] =  useState<ICommentData>()

    function handleChangeEditableComment(details: ValueChangeDetails): void {
        console.log('handleChangeComment...')
        console.log('=> details: ', details)
    }

    function handleConfirmEditableComment(data: ICommentData): void {
        console.log('handleUpdateComment...')
        console.log('=> data: ', data)
    }

    function handleChangeComment(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        data?: ICommentData 
    ): void {
        console.log('handleChangeComment...')
        console.log('=> body value: ', e.target.value)
        console.log('=> data: ', data)
        setCommentData({
            user_id: data?.user_id,
            post_id: data?.post_id,
            body: e.target.value,
        })
    }
    
    function handleSubmitComment(): void {
        console.log('handleSubmitComment...')
        console.log('=> comment data: ', commentData)
    }

    function renderPostCommentContent(post: IPost): React.ReactNode {
        let postCommentUser = null 

        if (post.comments && !!post.comments.length) {
            const filteredByCommentUser = 
                posts
                    .filter(item => 
                        item.user_id === post?.comments?.[0]?.user_id
                    )[0]
            if(
                filteredByCommentUser && 
                !!Object.keys(filteredByCommentUser).length

            ) postCommentUser = filteredByCommentUser
        }

        return (
                <>
                    <PostComment.Header>
                        {
                            postCommentUser && 
                                handlers
                                .handlePostHeaderBody(postCommentUser)
                        }
                    </PostComment.Header>
                    <PostComment.Content
                        key={post.id} 
                        commentList={post.comments}
                        onChangeComment={(e) => handleChangeComment(e, { user_id: post.user_id, post_id: post.id, })}
                        onSubmitComment={handleSubmitComment}
                        onChangeEditableComment={handleChangeEditableComment}
                        onConfirmEditableComment={(details: ValueChangeDetails) => {
                            handleConfirmEditableComment({
                                user_id: post.user_id,
                                post_id: post.id,
                                body: details.value,
                            })
                        }}
                    />
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
                            comment={renderPostCommentContent(post)} 
                        />
                        
                    </PostCard.Container>
               ))
            }
        </>
    )
}