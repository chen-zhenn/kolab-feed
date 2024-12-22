import { 
    Card, 
} from '@chakra-ui/react'
import { IPostCard } from './types'

export default function PostCardHeader({ 
    children, 
    divider, 
}:  IPostCard) {
    return (
        <Card.Header className={ divider ? '-divider' : '' }>
            {children}
        </Card.Header>
    )
}