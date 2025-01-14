import { ValueChangeDetails } from '@zag-js/editable'

import { 
    IPost,
    IPostData,
    IComments,
    ICommentData, 
} from '@/domain/models'

export type CrudAction = 'add' | 'edit' | 'delete'
export interface IHandlers {
    handlePostHeaderBody: (post: IPost) => React.ReactNode;
    handlePostContentBody: (post: IPost) => React.ReactNode;
    handleConfirmBodyPost: (details: ValueChangeDetails) => void;
}

export interface IPostPage {
    data: IPost [];
    postData?: IPostData;
    handlers: IHandlers;
}
