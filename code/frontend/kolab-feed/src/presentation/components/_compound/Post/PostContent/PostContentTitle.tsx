import { Title } from './styles'
import { IPostContent } from './types'

export default function PostContentTitle({
    title,
}: IPostContent){
    return (
        <Title>{title}</Title>
    )
}