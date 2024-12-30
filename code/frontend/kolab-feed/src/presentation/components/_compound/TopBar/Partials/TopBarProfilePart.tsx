import { 
    useEffect, 
    useState,
} from 'react'

import { 
    NavLink,
    useNavigate,
} from 'react-router'

import { 
    Text,
    Card,
} from '@chakra-ui/react'

import { 
    LuUserRound,
    LuMail,
    LuLogOut,
} from 'react-icons/lu'

import { IUsers } from '@/domain/models'

import { 
    HttpStatusCode,
    IHttpResponse,
} from '@/infra'

import { HttpStatusMessages } from '@/main/services'

import {
    makeUser,  
} from '@/main/usecases'

import { Utils } from '@/presentation/shared'

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
    const nav = useNavigate()
    const [userData, setUserData] = useState<IUsers>()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async function(){
            try {
                const userAuth = await user.getUserAuth()
                if(userAuth && userAuth.id) {
                    const userResponse = await user.getById(userAuth.id)
                    if(userResponse && userResponse.status === 200) {
                        if(userResponse.data) setUserData({ ...userResponse.data[0], email: userAuth.email ?? '' })
                    }
                }
            } catch (error) {
                //
            } finally {
                setLoading(false)
            }
        }())
    }, [])

    async function handleLogout(): Promise<IHttpResponse<any> | any> {
        try {
            const response = await user.logout()
            if(response) {
                if(response.status === 204) {
                    //
                    localStorage.clear()
                    return nav('/')
                }
                const { statusText, message, ...newResponse } = response
                newResponse.statusText = 'fail'
                newResponse.message = 'Algo inesperado: Falha ao desconectar. Por favor, tente novamente'
                return launchToast(newResponse)
            }
        } catch (error) {
            const response = {
                status: HttpStatusCode.servererror,
                statusText: 'error',
                message: HttpStatusMessages.servererror,
            }
            return launchToast(response)
        }
    }

    return (
        <Section className='-profile' open={open}>
            <Avatar 
                name={userData?.username} 
                size='xl' 
                src={userData?.avatar}
                cursor='pointer'
                onClick={() => setOpen(!open)} 
            />
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
                                Logout
                            </Text>
                    </Card.Body>
                    )
                }
            </Card.Root>
        </Section>
    )
}