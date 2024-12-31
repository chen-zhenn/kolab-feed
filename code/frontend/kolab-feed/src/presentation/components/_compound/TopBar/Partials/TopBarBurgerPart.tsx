import { 
    useContext, 
} from 'react'

import { 
    FaBars 
} from 'react-icons/fa'

import { UIContext } from '@/states/context'

import { 
    Section,
} from '../styles'

export default function TopBarBurgerPart() {

    const uiState = useContext(UIContext)
    const { visibility, setVisibility } = uiState

    return (
        <Section 
            className='-burger' 
            onClick={() => 
                setVisibility({ 
                ...visibility, 
                sidebar: !visibility.sidebar, 
                })
        }>
            <FaBars size='1.25em' />
        </Section>
    )
}