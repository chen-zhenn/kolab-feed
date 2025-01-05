import { 
    Card, 
} from '@chakra-ui/react'

import { IPostCard } from './types'

export default function PostCardFooter({ children }: IPostCard){
    return (
        <Card.Footer>
            {children}
        </Card.Footer>
    )
}