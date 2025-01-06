import {
    useNavigate, 
    useSearchParams,
    useLocation,
} from 'react-router'

import { LuSearch } from 'react-icons/lu'

import {
    Input
} from '@chakra-ui/react'

import { 
    makePost, 
} from '@/main/usecases'

import { 
    InputGroup,
 } from '@/presentation/components'

import { 
    Section,
} from '../styles'

export default function TopBarSearchPart() {

    const post = makePost()
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    async function handleSearch(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value

        try {
            const response = await post.filterByParams({
                title: value,
                body: value,
            })
            if(response) {
                //
            }
        } catch (error) {
            //
        }
    }

    return (
        <Section className='-search'>
            <InputGroup startElement={<LuSearch />}>
                <Input 
                    placeholder='Pesquisar título ou conteúdo' 
                    variant='subtle'
                    onChange={(event) =>  handleSearch(event)} 
                />
            </InputGroup>
        </Section>
    )
}