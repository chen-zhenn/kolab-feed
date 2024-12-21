import { useNavigate } from 'react-router'

import { 
    Image,
    Input,
} from '@chakra-ui/react'

import { Avatar } from '@/presentation/components/ui'

import { 
    Section,
 } from './styles'

import { ITopBar } from './types'

export default function TopBarSection({ type, children }: ITopBar) {

    const nav = useNavigate()

    const section: Record<string, any> = {
        burger: <Section>Burger</Section>,
        brand: <Section><Image src='logo.svg' onClick={() => nav('/feed')} style={{ cursor: 'pointer' }} /></Section>,
        search: <Section className='-search'><Input placeholder='Pesquise por usuário' variant='subtle' /></Section>,
        profile: <Section><Avatar name='John Doe' src='https://bit.ly/sage-adebayo' /></Section>,
        generic: <Section>{children}</Section>,
      }

    return ( type ? section[type] : section['generic'] )
}