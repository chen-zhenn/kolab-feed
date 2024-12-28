import styled from 'styled-components'

export const Wrap = styled.div<{ bg?: string }>`
    position: relative;
    height: 100vh;
    background-color: ${(props) => props.bg ?? 'var(--chakra-colors-gray-50)'}
`

export const Container = styled.div`
    display: flex;
    height: 100%;
`

export const Form = styled.form`
    display: flex;
    flex-flow: column;
    min-width: 60%;
    margin: auto;

`

export const FormItem = styled.div<{ action?: boolean }>`
    display: flex;
    flex-flow: column;
    grid-gap: 1.75rem;

    &:first-child {
        margin-bottom: 1.75rem;
    }
`