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
                src={`/logo.svg`} 
                onClick={() => nav('/feed')} style={{ cursor: 'pointer' }} 
            />
        </Section>
    )
}