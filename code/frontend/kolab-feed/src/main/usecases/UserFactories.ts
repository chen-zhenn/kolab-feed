import { IAuth } from '@/domain/models'

import { 
    UseCaseUserLogin,
    UseCaseUserLogout,
    UseCaseGetUserAuth,
    UseCaseGetUsersById,
} from '@/main/usecases'

export function makeUser() {

    return {
        login: (authData: IAuth) => 
            UseCaseUserLogin(authData),
        logout: () => 
            UseCaseUserLogout(),
        getById: (user_id: string) => 
            UseCaseGetUsersById(user_id),
        getUserAuth: UseCaseGetUserAuth,
    }
}