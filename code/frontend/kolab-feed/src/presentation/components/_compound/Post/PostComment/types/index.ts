import { IComments } from '@/domain/models';
import { ValueChangeDetails } from '@zag-js/editable'

export interface IPostComment {
    children?: React.ReactNode;
    commentList?: IComments[];
    onChangeEditableComment?: (details: ValueChangeDetails) => void;
    onConfirmEditableComment?: (details: ValueChangeDetails) => void;
    onChangeComment?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmitComment?: () => void;
}