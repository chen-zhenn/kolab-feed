import styled, { css } from 'styled-components'

const EmptyElem = css`
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
`

const ThinBorder = css`
    ${EmptyElem};
    width: 100%;
    height: 1px;
    background-color: var(--chakra-colors-gray-200);
`

export const Header = styled.header`
    margin-bottom: .85rem;
`
export const Container = styled.article`
    padding-top: 1.75rem;
    
    &:before {
        ${ThinBorder};
    }
`

export const ContentSection = styled.section`
    padding: .85rem;
`
