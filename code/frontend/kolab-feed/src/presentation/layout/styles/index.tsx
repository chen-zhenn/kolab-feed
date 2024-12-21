import styled from 'styled-components'

import { 
    GridTemplate,  
} from '../types'


const shared = () => `
    background-color: rgba(255, 197, 32, 1);
` 

export const Wrap = styled.div<{ grid: GridTemplate }>`
    position: relative;
    display: grid;
    grid-template-columns: ${(props) => setGridLayout(props.grid) };
    width: 100%;
    min-height: 100vh;
    transition: transform .33s ease;

    &.-full {
        width: 138vw;
        transform: translateX(-38.2vw);
    }
`

export const Header = styled.header`
    ${shared}
    grid-row: 1;
    grid-column: 2 / 3;
    padding: 1.75rem;
`

export const Content = styled.main`
    grid-row: 2;
    grid-column: 2 / 3;
    padding: 1.75rem;
`

export const Sidebar = styled.aside`
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(26, 32, 44, 1);

`

export const Footer = styled.footer`
    ${shared}
    grid-row: 3;
    grid-column: 1 / 3;
    text-align: center;
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
