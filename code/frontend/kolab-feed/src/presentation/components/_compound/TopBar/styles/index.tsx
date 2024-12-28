import styled from 'styled-components'

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

    }

    &.-search {
        margin-right: auto;
    }    
`