import { Container } from './styles'
import { IPostHeader } from './types'

export default function PostHeader({ children }: IPostHeader) {
    return (
        <Container>{children}</Container>
    )
}