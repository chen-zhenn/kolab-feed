import styled from 'styled-components'

import { colors } from '@/presentation/theme'

export const Wrap = styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
`

export const Header = styled.header`
    position: relative;
    transform: translate3d(0, 3rem, 0);
    z-index: 2;
`

export const Heading = styled.h3`
    position: relative
    max-width: 70%;
    margin: 0 auto;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.33rem;
    color: ${colors.secondary900};
    cursor: pointer;
    transition: all .45s ease-in-out;

    &:before,
    &:after {
        content: '';
        position: absolute;
        display: block;
        left: 50%;
        width: 150px;
        height: 1px;
        margin-left: -75px;
        background-color: ${colors.secondary900};
        transition: all .27s ease-in-out;
    }

    &:before {
        top: 0;
    }

    &:after {
        bottom: 0;
    }

    &:hover {
        color: ${colors.secondary200};
    }
`