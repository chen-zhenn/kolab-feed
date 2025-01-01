import { useEffect } from 'react'

import { 
    useNavigate,
    Outlet,
} from 'react-router'

import {
    makeUser,  
} from '@/main/usecases'

export default function Profile() {

    const user = makeUser()
    const nav = useNavigate()

    useEffect(() => {
        (async function(){
            try {
                const userAuth = await user.getUserAuth()
                if(userAuth && userAuth.id) nav(`/profile/${userAuth.id}`)
            } catch (error) {
                return 
            }
        }())
    }, [])

    return ( <Outlet /> )
}