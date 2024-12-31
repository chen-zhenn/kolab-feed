import styled from 'styled-components'

import { colors } from '@/presentation/theme'

export const Nav = styled.nav`
    width: 100%;
    margin: auto;
    z-index: 2;
`

export const Menu = styled.ul``

export const MenuItem = styled.li`
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    gap: .5rem 0;
    color: ${colors.secondary200};

    a {
        position: relative;
        display: flex;
        flex-grow: 1;
        flex-flow: column;
        width: 100%;
        height: 100%;
        height: 3rem;
        gap: 1rem;
        align-items: center;
        color: inherit;
        cursor: pointer;
        transition: all .30s ease;

        &:after {
            content: '';
            bottom: 0;
            left: 0;
            width: 13%;
            height: 1px;
            background-color: ${colors.secondary900};
            transition: all .27s ease-in-out;
        }

        &:hover {
            color: ${colors.primary};

            &:after {
                width: 25%;
                background-color: ${colors.secondary400};
            }
        }
    }

    &:hover {
        &:after {
            width: 100%;
            background-color: ${colors.secondary400};
        }
    }
`