const { 
    VITE_APP_BASE_URL 
} = import.meta.env

import { 
    memo, 
    useContext, 
} from 'react'

import { useNavigate } from 'react-router'

import { 
    FaBars 
} from 'react-icons/fa'

import { 
    Image,
    Input,
} from '@chakra-ui/react'

import { UIContext } from '@/states/context'

import { 
    Section,
} from './styles'

import { ITopBar } from './types'

import { Partial } from './Partials'

function TopBarSection({ 
    type, 
    children, 
}: ITopBar) {

    const uiState = useContext(UIContext)
    const nav = useNavigate()
    const { visibility, setVisibility } = uiState



    const section: Record<string, any> = {
        burger: 
            <Section
                className='-burger'
                onClick={() => 
                    setVisibility({ 
                        ...visibility, 
                        sidebar: !visibility.sidebar, 
                    })
                }
                >
                <FaBars size='1.25em' />
            </Section>,
        brand: 
            <Section>
                <Image 
                    src={`${VITE_APP_BASE_URL}/logo.svg`} 
                    onClick={() => nav('/feed')} style={{ cursor: 'pointer' }} 
                />
            </Section>,
        search: 
            <Section className='-search'>
                <Input placeholder='Pesquise por usuário' variant='subtle' />
            </Section>,
        profile: <Partial.TopBarProfile />,
        generic: 
            <Section>{children}</Section>,
      }

    return ( section[type ?? 'generic'] )
}

export default memo(TopBarSection)