import { Header } from './styles'
import { IPostComment } from './types'

export default function PostCommentHeader({ children }: IPostComment) {
    return (
        <Header>
            {children}
        </Header>
    )
}