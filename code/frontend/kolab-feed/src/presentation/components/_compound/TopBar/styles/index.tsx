import styled from 'styled-components'

import { 
    breakpoints, 
} from '@/presentation/theme'

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1.75rem;
`

export const Section = styled.section`

    &.-burger {
        cursor: pointer;

        @media(min-width: ${breakpoints.xxxlarge}) {
            display: none;
        }
    }

    &.-search {
        margin-right: auto;
    }    
`