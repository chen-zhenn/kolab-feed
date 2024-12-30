import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1.75rem;
`

export const Section = styled.section<{ open?: boolean }>`

    &.-profile {
        position: relative;
        align-items: center;
        z-index: 1;

        .card {
            position: absolute;
            display: ${(props) => props.open ? 'flex' : 'none'};
            bottom: -320%;
            right: 0vw;
            justify-content: center;
            min-width: 212px;
            min-height: 150px;
            border-radius: unset;
        }
        
        .body {
            display: flex;

            &__item {
                display: flex;
                align-items: center;
                gap: .25rem;
                padding-top: .5rem;
                padding-bottom: .5rem;
                color: var(--chakra-colors-gray-500);
                border-bottom: solid 1px var(--chakra-colors-gray-200);
                cursor: pointer;

                &:hover {
                    color: var(--chakra-colors-blue-300);
                }
            }
        }
    }

    &.-burger {
        cursor: pointer;

    }

    &.-search {
        margin-right: auto;
    }    
`