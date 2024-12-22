import { IComments } from './Comments'
import { IUsers } from './User'

export interface IPostContent {
    title: string;
    body: string;
    image?: string;
}

export interface IPost extends IPostContent {
    id: number;
    userId: number;
    created_at?: string;
    users?: IUsers;
    comments?: IComments[];
}