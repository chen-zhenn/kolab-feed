import styled from 'styled-components'

import { colors } from '@/presentation/theme'

export const Wrap = styled.aside`
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${colors.primary};
    // background-color: transparent;
`