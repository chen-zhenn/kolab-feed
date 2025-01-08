import { 
    IUsers,
} from '@/domain/models'

import { 
    HttpStatusCode,
} from '@/infra'

import {
    makeUser,  
} from '@/main/usecases'

import { HttpStatusMessages } from '@/main/services'

import { Utils } from '@/presentation/shared'
import { useEffect, useState } from 'react'

interface IUseGetUser {
    data?: IUsers;
    loading: boolean;
}

export function useGetUser(): IUseGetUser {

    const { launchToast } = Utils
    const user = makeUser()
    const [data, setData] = useState<IUsers>()
    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        let isMounted = true;

        (async function(){
            setLoading(true)
            try {
                const userAuth = await user.getUserAuth()
                if(
                    userAuth && 
                    userAuth.id
                ) {
                    if(!isMounted) return 
                    const userResponse = await user.getById(userAuth.id)
                    
                    if(
                        userResponse && 
                        userResponse.status === 200
                    ) {
                        if(userResponse.data && !!userResponse.data.length) 
                            setData(userResponse.data[0])
                    }
                }
            } catch (error) {
                if(!isMounted) return
                const response = {
                    status: HttpStatusCode.servererror,
                    statusText: 'error',
                    message: HttpStatusMessages.servererror,
                }
                launchToast(response)

            } finally {
                if(!isMounted) return
                setLoading(false)
            }
        }())

        return () => {
            isMounted = false
        }
        
    }, [])

    return {
        data,
        loading,
    }
}