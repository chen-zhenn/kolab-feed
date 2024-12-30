import styled from 'styled-components'

const shared = () =>  `
    cursor: pointer;
`

export const Container = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 1.33rem;
`

export const Title = styled.h5`
    ${shared}
    &:hover {
        text-decoration: underline;
        color: var(--chakra-colors-blue-300);
    }
`

export const ActionContainer = styled.aside`
    margin-left: auto;
`

export const AvatarContainer = styled.aside`
    ${shared}
    margin-right: .85rem;
`
