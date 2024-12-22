import { 
    Card, 
} from '@chakra-ui/react'
import { IPostCard } from './types'
import { PostCardContainer } from './styles'

export default function PostCard({ 
    children,
    onClick,
}:  IPostCard) {

    return (
        <PostCardContainer onClick={onClick}>
            <Card.Root>
                {children}
            </Card.Root>
        </PostCardContainer>
    )
}