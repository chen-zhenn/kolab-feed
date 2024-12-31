import {
    Input
} from '@chakra-ui/react'

import { 
    Section,
} from '../styles'

export default function TopBarSearchPart() {

    return (
        <Section className='-search'>
            <Input placeholder='Pesquise por usuário' variant='subtle' />
        </Section>
    )
}