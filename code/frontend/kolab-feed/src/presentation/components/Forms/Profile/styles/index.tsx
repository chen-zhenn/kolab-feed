import styled from 'styled-components'

import { 
    Card,
    Heading as _Heading, 
} from '@chakra-ui/react'

import { colors } from '@/presentation/theme'

const avatarHeight = 180

export const Header = styled.header`
    position: relative;
    z-index: 1;
`

export const Heading = styled(_Heading)`
    color: inherit;
`

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Content = styled(Card.Root)`
    transform: translate3d(0, ${(avatarHeight / 2) * -1}px, 0);
`

export const ContentHeader = styled(Card.Header)`
    margin: ${avatarHeight / 2}px auto auto;
`

export const ContentBody = styled(Card.Body)``

export const ContentFooter = styled(Card.Footer)`
    display: flex;
    text-align: center;
    justify-content: flex-end;
`

export const ContentSection = styled.section`
    flex-grow: 1;
    text-align: center;
    padding: 1.75rem;
    color: ${colors.secondary200};
`

export const ContentSectionBody = styled.article`
    display: flex;
    gap: 0 .85rem;
    align-items: center;
    margin-top: 1.75rem;
    color: ${colors.black};
`

export const AvatarContainer = styled.aside`
    position: relative;
    width: ${avatarHeight}px;
    height: ${avatarHeight}px;
    margin: 0 auto;
    cursor: pointer;
`

export const AvatarEditIcon = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1.5rem;
    color: ${colors.secondary200};
`
