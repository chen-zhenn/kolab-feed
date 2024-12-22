import { useContext } from 'react'

import { useNavigate } from 'react-router'

import { 
    FaBars 
} from 'react-icons/fa'

import { 
    Image,
    Input,
} from '@chakra-ui/react'

import { UIContext } from '@/states/context'

import { Avatar } from '@/presentation/components/ui'

import { 
    Section,
 } from './styles'

import { ITopBar } from './types'

export default function TopBarSection({ type, children }: ITopBar) {

    const uiState = useContext(UIContext)
    const nav = useNavigate()
    const { visibility, setVisibility } = uiState

    const section: Record<string, any> = {
        burger: 
            <Section
                className='-burger'
                onClick={() => setVisibility({ sidebar: !visibility.sidebar })}>
                <FaBars size='1.25em' />
            </Section>,
        brand: 
            <Section>
                <Image 
                    src='logo.svg' 
                    onClick={() => nav('/feed')} style={{ cursor: 'pointer' }} />
            </Section>,
        search: 
            <Section className='-search'>
                <Input placeholder='Pesquise por usuário' variant='subtle' />
            </Section>,
        profile: 
            <Section>
                <Avatar name='John Doe' src='https://bit.ly/sage-adebayo' />
            </Section>,
        generic: 
            <Section>{children}</Section>,
      }

    return ( section[type ?? 'generic'] )
}