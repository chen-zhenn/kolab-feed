import { Container } from './styles'
import { ITopBar } from './types'

export default function TopBar({ children, }: ITopBar) {

    return (
        <Container>{ children }</Container>
    )
}