import styled, { keyframes, css } from 'styled-components'

import { colors } from '@/presentation/theme'

const scaleTransition = keyframes`
    0% {
        transform: scaleX(0);
        transform-origin: center left;
    }
    50% {
        transform: scaleX(1);
        transform-origin: center left;
    }
    75% {
        transform: scaleX(1);
        transform-origin: center right;
    }
    100% {
        transform: scaleX(0);
        transform-origin: center right;
    }
`

const transitionIn = keyframes`
    0% {
        transform: scaleX(1);
        transform-origin: center left;
    }
    50% {
        transform: scaleX(1);
        transform-origin: center right;
    }
    100% {
        transform: scaleX(0);
        transform-origin: center right;
    }
`

const transitionOut = keyframes`
    0% {
        transform: scaleX(0);
        transform-origin: center right;
    }
    50% {
        transform: scaleX(1);
        transform-origin: center right;
    }
    75% {
        transform: scaleX(1);
        transform-origin: center left;
    }
    100% {
        transform: scaleX(0);
        transform-origin: center left;
    }
`

export const Shared = () =>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    will-change: transform;

`
export const OverlayTransition = styled.aside<{ animate: 'enter' | 'exit' | 'none' }>`
    ${Shared};
    background-color: ${colors.primary};
    transition: all 1.5s ease-in-out;
    z-index: 9;

    ${(props) => props.animate === 'enter' && css`animation: ${transitionIn} 1.75s ease forwards`}
    ${(props) => props.animate === 'exit' && css`animation: ${transitionOut} 1.75s ease forwards`}
    ${(props) => props.animate === 'none' && css`
        animation: none;
        transform: scaleX(0);
    `};
`
