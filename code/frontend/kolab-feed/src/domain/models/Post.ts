import { IComments } from './Comments'
import { IUsers } from './User'

export interface IPostData {
    id?: number;
    title: string;
    body: string;
    imageFile?: File;
    image?: string
}

export interface IPost extends IPostData {
    id: number;
    user_id: string;
    users: IUsers[];
    created_at: string;
    comments?: IComments[];
}