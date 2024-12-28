import { IAuth } from './Auth'

export interface IUsers extends IAuth {
    id: number;
    post_id: number;
    user_id: string;
    username: string;
    avatar?: string;
    created_at?: string;
}