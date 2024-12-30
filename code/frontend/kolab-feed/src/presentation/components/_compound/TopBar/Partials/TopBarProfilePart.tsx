import { 
    useEffect, 
    useState,
} from 'react'

import { 
    NavLink
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
    makeUser,  
} from '@/main/usecases'

import {
    Avatar,
    SkeletonText, 
} from '@/presentation/components'

import { 
    Section,
} from '../styles'

export default function TopBarProfilePart() {

    const user = makeUser()
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