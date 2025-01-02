import { 
    Card, 
} from '@chakra-ui/react'

import { IPostCard } from './types'

import { 
    ContentSection,
    ContentSectionHeader,
    Heading,
} from './styles'

export default function PostCardContent({
    content,
    comment,
 }:  IPostCard) {
    return (
        <Card.Body>
            <ContentSection>
                {content}
            </ContentSection>

            <ContentSection>
                <ContentSectionHeader>
                    <Heading size='md'>Comentários</Heading>
                </ContentSectionHeader>
                {comment}
            </ContentSection>
        </Card.Body>
    )
}