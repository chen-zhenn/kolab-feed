const { 
    VITE_APP_BASE_URL 
} = import.meta.env

import { 
    useNavigate,
} from 'react-router'

import { 
    Image,
} from '@chakra-ui/react'

import { 
    Section,
} from '../styles'

export default function TopBarBrandPart() {

    const nav = useNavigate()

    return (
        <Section>
            <Image 
                src={`${VITE_APP_BASE_URL}/logo.svg`} 
                onClick={() => nav('/feed')} style={{ cursor: 'pointer' }} 
            />
        </Section>
    )
}