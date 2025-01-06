import { 
    ICommentData, 
} from '@/domain/models'

export interface IHandlers {
    onCancel: () => void;
}

export interface IFormComment {
    data?: ICommentData;
    handlers: IHandlers;
}