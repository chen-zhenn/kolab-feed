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
    grid-template-columns: ${(props) => setGridLayout(props.grid) };
    width: 100vw;
    min-height: 100vh;
    transition: all .075s linear;
    transform: translateX(0);

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

    @media(min-width: ${breakpoints.xxxlarge}) {
        max-width: 1440px;
        margin: 0 auto;

        &.-expanded {
            width: 100%;
            transform: unset;
        }
    }

`

export const Header = styled.header`
    ${shared}
    grid-row: 1;
    grid-column: 1 / 3;
    padding: 1.75rem;

    @media(min-width: ${breakpoints.medium}) {
        grid-column: 2 / 3;
    }
`

export const Content = styled.main`
    grid-row: 3;
    grid-column: 1 / 3;
    padding: 1.75rem;

    @media(min-width: ${breakpoints.medium}) {
        grid-row: 2;
        grid-column: 2 / 3;
    }
`

export const Sidebar = styled.aside`
    grid-row: 2;
    grid-column: 1 / 3;
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

`

export const Footer = styled.footer`
    ${shared}
    grid-row: 4;
    grid-column: 1 / 3;
    text-align: center;

    @media(min-width: ${breakpoints.medium}) {
        grid-row: 3;
    }
`

export const Generic = styled.div``

function setGridLayout(grid?: GridTemplate): string {
    const template = {
        'default': 'repeat(auto-fit, minmax(320px, 1fr))',
        'golden-ratio': '0.382fr 1fr',
        'split-screen': '.7fr 1fr',
    }
    return grid ? template[grid] : template['default']
}
