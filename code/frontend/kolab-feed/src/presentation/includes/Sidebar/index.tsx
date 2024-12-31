import { 
    useNavigate,
} from 'react-router'

import {
    MenuNav,
} from '@/presentation/components'

import { 
    Wrap,
    Header,
    Heading,
} from './styles'

export default function Sidebar(){

    const nav = useNavigate()

    return (
        <Wrap>
            <Header onClick={() => nav('/feed')}>
                <Heading>
                    Kolab Feed
                </Heading>
            </Header>
            <MenuNav />
        </Wrap>
    )
}