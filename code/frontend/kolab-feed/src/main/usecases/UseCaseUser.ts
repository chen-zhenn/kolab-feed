import { IAuth } from '@/domain/models'
import {
    ISupaBaseUser, 
    ServiceSupaBase, 
} from '@/main/services'

export async function UseCaseUserLogin(authData: IAuth): Promise<any> {
    return ServiceSupaBase.Login(authData)
}

export async function UseCaseGetUser(): Promise<ISupaBaseUser | null> {
    return ServiceSupaBase.getUser()
}