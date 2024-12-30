import { IAuth } from '@/domain/models'

import { 
    UseCaseUserLogin,
    UseCaseGetUserAuth,
    UseCaseGetUsersById,
} from '@/main/usecases'

export function makeUser() {

    return {
        login: (authData: IAuth) => 
            UseCaseUserLogin(authData),
        getById: (user_id: string) => 
            UseCaseGetUsersById(user_id),
        getUserAuth: UseCaseGetUserAuth,
    }
}