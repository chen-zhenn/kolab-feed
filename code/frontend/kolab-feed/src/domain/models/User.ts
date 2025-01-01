import { IAuth } from './Auth'

export interface IUsers extends IAuth {
    id: string;
    post_id: number;
    user_id: string;
    username: string;
    avatar?: string;
    created_at?: string;
}

export interface IUserData {
    id?: string;
    user_id?: string;
    username?: string;
    email?: string;
    avatar?: string;
    imageFile?: File;
    created_at?: string;
}
