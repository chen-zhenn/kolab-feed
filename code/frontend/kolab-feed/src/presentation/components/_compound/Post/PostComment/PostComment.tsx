import { Container } from './styles'
import { IPostComment } from './types'

export default function PostComment({ children }: IPostComment) {
    return (
        <Container>
            {children}
        </Container>
    )
}