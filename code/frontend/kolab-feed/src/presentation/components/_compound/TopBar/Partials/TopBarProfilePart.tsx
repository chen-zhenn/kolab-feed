import { 
    useState,
    useContext,
} from 'react'

import { 
    NavLink,
    useNavigate,
} from 'react-router'

import { 
    Text,
    Card,
    Spinner,
} from '@chakra-ui/react'

import { 
    LuUserRound,
    LuMail,
    LuLogOut,
} from 'react-icons/lu'

import { UIContext } from '@/states/context'

import {
    IHttpResponse,
} from '@/infra'

import {
    makeUser,  
} from '@/main/usecases'

import { Utils } from '@/presentation/shared'

import { 
    useGetUser, 
} from '@/presentation/hooks'

import {
    Avatar,
    SkeletonText, 
} from '@/presentation/components'

import { 
    Section,
} from '../styles'

export default function TopBarProfilePart() {

    const user = makeUser()
    const { launchToast } = Utils
    const uiState = useContext(UIContext)
    const { setVisibility } = uiState
    const nav = useNavigate()
    const [open, setOpen] = useState(false)
    
    const { 
        data: userData, 
        loading,
    } = useGetUser()
    
    async function handleLogout(): Promise<IHttpResponse<any> | any> {

        try {
            const response = await user.logout()
            if(response) {
                if(response.status === 204) {
                    setVisibility({ 
                        sidebar: true, 
                        transition: 'exit', 
                      })
                }
            }
        } catch (error) {
            const newResponse = {
                status: 204,
                statusText:'warning',
                message:'Algo inesperado: Falha ao desconectar. Por favor, tente novamente'
            }
            return launchToast(newResponse)
        } finally {
            localStorage.clear()
            setTimeout(() => nav('/'), 1445)
        }
    }

    return (
        <Section className='-profile' open={open}>
            {
                loading ? 
                (
                    <Spinner size='lg' borderWidth='5px' />
                ) : 
                (
                    <Avatar 
                    name={userData?.username} 
                    size='xl' 
                    src={userData?.avatar}
                    cursor='pointer'
                    onClick={() => setOpen(!open)} 
                />
                )
            }

            <Card.Root className='card'>
                {
                    loading ? (
                        <SkeletonText width='80%' gap='15px' margin='auto'  />
                    ) : (
                        <Card.Body className='body' shadow='md'>
                            <NavLink to='/profile'>
                                <Text 
                                    fontWeight='bold' 
                                    className='body__item'
                                    textStyle='sm'
                                >
                                    <LuUserRound />
                                    {userData?.username}
                                </Text>
                            </NavLink>
    
                            <Text 
                                className='body__item'
                                textStyle='xs'
                            >
                                <LuMail />
                                {userData?.email}
                            </Text>
                            <Text 
                                className='body__item'
                                textStyle='xs'
                                onClick={handleLogout}
                            >
                                <LuLogOut />
                                Sair
                            </Text>
                    </Card.Body>
                    )
                }
            </Card.Root>
        </Section>
    )
}