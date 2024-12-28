import {
    IPostData,
}  from '@/domain/models'

export interface IHandlers {
    onCancel: () => void
}

export type IData = IPostData 

export interface IFormPost {
    data: IData;
    handlers: IHandlers;
}
