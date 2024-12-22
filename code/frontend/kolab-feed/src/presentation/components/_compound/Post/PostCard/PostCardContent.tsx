import { 
    Card, 
} from '@chakra-ui/react'

import { IPostCard } from './types'
import { ContentSection } from './styles'

export default function PostCardContent({
    content,
    comment,
 }:  IPostCard) {
    return (
        <Card.Body>
            <ContentSection>{content}</ContentSection>
            <ContentSection>{comment}</ContentSection>
        </Card.Body>
    )
}