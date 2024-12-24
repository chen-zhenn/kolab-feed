import { IComments } from './Comments'
import { IUsers } from './User'

export interface IPostData {
    userId: number;
    title: string;
    body: string;
    created_at?: string;
    image?: string;
}

export interface IPost extends IPostData {
    id: number;
    users?: IUsers;
    comments?: IComments[];
}