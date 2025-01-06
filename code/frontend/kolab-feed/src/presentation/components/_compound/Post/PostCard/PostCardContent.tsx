import { 
    Card, 
} from '@chakra-ui/react'

import { IPostCard } from './types'

import {
    ContentSectionPost,
    ContentSectionComment,
    ContentSectionHeader,
    Heading,
} from './styles'

export default function PostCardContent({
    content,
    comment,
 }:  IPostCard) {
    return (
        <Card.Body>
            <ContentSectionPost>
                {content}
            </ContentSectionPost>

            <ContentSectionComment>
                <ContentSectionHeader>
                    <Heading size='md'>Comentários</Heading>
                </ContentSectionHeader>
                {comment}
            </ContentSectionComment>
        </Card.Body>
    )
}