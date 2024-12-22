import { Title } from './styles'
import { IPostHeader } from './types'

export default function PostHeaderAvatar({ 
    title,
    onClick, 
}: IPostHeader) {
    return (
        <Title onClick={onClick}>
            {title}
        </Title>)
}