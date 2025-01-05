import styled, { css } from 'styled-components'

import { 
    Heading as _Heading,
    Text as _Text, 
} from '@chakra-ui/react'

import { colors } from '@/presentation/theme'

const EmptyElem = css`
    content: '';
    position: absolute;
    display: block;
    bottom: 0;
    left: 0;
`

const ThinBorder = css`
    ${EmptyElem};
    width: 100%;
    height: 1px;
    background-color: var(--chakra-colors-gray-200);
`

import { 
    breakpoints, 
} from '@/presentation/theme'

export const PostCardContainer = styled.article`
    margin: 0 auto;
    margin-bottom: 1.75rem;
    
    .-divider {
        position: relative;
        &:after {
            ${ThinBorder};
        }
    }

    @media(min-width: ${breakpoints.medium}) {
        max-width: 50vw;
    }
`
export const ContentSection = styled.section`
    position: relative;
`
export const ContentSectionPost = styled(ContentSection)``

export const ContentSectionComment = styled(ContentSection)``

export const ContentSectionHeader = styled.header`
    padding-top: .85rem;
    padding-bottom: .85rem;
`

export const Heading = styled(_Heading)`
    color: ${colors.secondary200};
`