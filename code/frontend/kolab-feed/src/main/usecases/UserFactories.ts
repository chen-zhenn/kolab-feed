import { IAuth } from '@/domain/models'

import { 
    UseCaseUserLogin,
    UseCaseGetUser,
} from '@/main/usecases'

export function makeUser() {

    return {
        login: (authData: IAuth) => UseCaseUserLogin(authData),
        get: UseCaseGetUser, 
    }
}