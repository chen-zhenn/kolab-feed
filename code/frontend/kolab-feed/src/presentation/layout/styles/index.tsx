import styled from 'styled-components'

import { 
    colors,
    breakpoints, 
} from '@/presentation/theme'

import { 
    GridTemplate,  
} from '../types'

const shared = () => `
    background-color: ${colors.primary};
` 

export const Wrap = styled.div<{ grid: GridTemplate }>`
    position: relative;
    display: grid;
    ${(props) => setGridLayout(props.grid)};
    width: 100vw;
    min-height: 100vh;
    transition: all .075s linear;
    transform: translateX(0);
    background-color: var(--chakra-colors-gray-50);

    &.-expanded {
        width: 100vw;
        transform: translateX(0);
    }
     
    @media(min-width: ${breakpoints.medium}) {
        width: 100%;
        transform: translateX(0);
        
        &.-expanded {
            width: 138vw;
            transform: translateX(-38.2vw);
        }
    }
`

export const Header = styled.header`
    ${shared}
    grid-row: 1;
    grid-column: 1 / 3;
    height: fit-content;
    padding: 1.75rem;

    @media(min-width: ${breakpoints.medium}) {
        grid-column: 2 / 3;
    }
`

export const Content = styled.main`
    grid-row: 3;
    grid-column: 1 / 3;
    height: 100%;
    overflow-y: auto;
    padding: 1.75rem;

    @media(min-width: ${breakpoints.medium}) {
        grid-row: 2;
        grid-column: 2 / 3;
    }
`

export const Sidebar = styled.aside`
    grid-row: 2;
    grid-column: 1 / 3;
    position: relative;
    overflow: hidden;
    height: 0;
    text-align: center;
    color: ${colors.white};
    background-color: ${colors.secondary};

    .-expanded & {
        height: max-content;
    }

    @media(min-width: ${breakpoints.medium}) {
        grid-row: 1 / 3;
        grid-column: 1 / 2;
        height: auto;

        .-expanded & {
            height: auto;
        }
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            repeating-conic-gradient(${colors.secondary600} 0 0.0001%,#0000 0 0.0002%) 
            60% 60%/3000px 3000px
    }

`

export const Footer = styled.footer`
    ${shared}
    display: none;
    grid-row: 4;
    grid-column: 1 / 3;
    text-align: center;

    @media(min-width: ${breakpoints.medium}) {
        grid-row: 3;
    }
`

export const Container = styled.div`

    @media(min-width: ${breakpoints.xxxlarge}) {
        max-width: 1440px;
        margin: 0 auto;

        .-expanded & {
            max-width: none;
            margin-right: auto;
            margin-left: calc((138vw - 100vw) / 2);
        }
    }
`

export const Generic = styled.div``

function setGridLayout(grid?: GridTemplate): string {


    const goldenRatio = `
        grid-template-rows: repeat(2, max-content) 1fr max-content;
        grid-template-columns: 0.382fr 1fr;
        height: 100%;

        @media (min-width: ${breakpoints.medium}) and (orientation: landscape) {
            grid-template-rows: max-content 1fr max-content;
        }

        @media(min-width: ${breakpoints.xlarge}) {
            grid-template-rows: max-content 1fr max-content;
        }

        @media(min-width: ${breakpoints.xxlarge}) {
            grid-template-columns: 382px 1fr;
        }
    `

    const template = {
        'default': 'grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))',
        'golden-ratio': goldenRatio,
        'split-screen': 'grid-template-columns: .7fr 1fr',
    }
    return grid ? template[grid] : template['default']
}
