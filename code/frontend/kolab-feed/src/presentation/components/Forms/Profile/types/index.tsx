import { ValueChangeDetails } from '@zag-js/editable'

import { 
    IPost,
    IUserData, 
} from '@/domain/models'

export interface IFormProfileHeader {
    avatar?: string;
    handleFileChange: (details: FileChangeDetails) => void;
}

export interface IContentHandlers {
    handleConfirmEditUserName: (details: ValueChangeDetails) => void;
    handleConfirmEditEmail: (details: ValueChangeDetails) => void;
    handleUpdateProfile: () => void;
}

export interface IFormProfileContent {
    posts: IPost[];
    user: IUserData;
    handlers: IContentHandlers;
}