import styled from 'styled-components'

import { 
    BreakPoints, 
} from '@/presentation/theme'

export const PostCardContainer = styled.article`
    margin: 0 auto;
    margin-bottom: 1.75rem;
    
    .-divider {
        position: relative;
        &:after {
            content: '';
            position: absolute;
            display: block;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: rgba(228, 228, 231, 1);
        }
    }

    @media(min-width: ${BreakPoints.large}) {
        max-width: 50vw;
    }
`
export const ContentSection = styled.section`
    position: relative;
`