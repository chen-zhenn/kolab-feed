import { IComments } from './Comments'
import { IUsers } from './User'

export interface IPostData {
    id?: number;
    title: string;
    body: string;
    imageFile?: File;
    image?: string
    user_id?: string;
    email?: string;
    user?: IUsers;
}

export interface IPost extends IPostData {
    id: number;
    created_at: string;
    comments?: IComments[];
}