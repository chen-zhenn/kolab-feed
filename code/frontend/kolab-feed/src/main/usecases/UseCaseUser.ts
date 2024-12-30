import { 
    IAuth,
    IUsers,
} from '@/domain/models'

import {  
    IHttpResponse,
} from '@/infra'

import {
    ISupaBaseUser, 
    ServiceSupaBase, 
} from '@/main/services'

export async function UseCaseUserLogin(authData: IAuth): Promise<any> {
    return ServiceSupaBase.Login(authData)
}

export async function UseCaseUserLogout(): Promise<any> {
    return ServiceSupaBase.Logout()
}

export async function UseCaseGetUserAuth(): Promise<ISupaBaseUser | null> {
    return ServiceSupaBase.getUserAuth()
}

export async function UseCaseGetUsersById(user_id: string): Promise<IHttpResponse<IUsers[]>>  {
    return ServiceSupaBase.getUsersById<IUsers>(user_id)
}