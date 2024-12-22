import styled from 'styled-components'

export const Header = styled.header`
    margin-bottom: .85rem;
`

export const Container = styled.aside`
    padding-top: 1.75rem;
    
    &:before {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: rgba(228, 228, 231, 1);
    }
`

export const Label = styled.span`
    font-weight: bold;
    color: rgba(0, 0, 0, .6); 
`