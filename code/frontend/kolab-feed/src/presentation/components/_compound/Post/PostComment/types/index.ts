import { ValueChangeDetails } from '@zag-js/editable'

export interface IPostComment {
    children?: React.ReactNode;
    contentValue?: string;
    onConfirmComment?: (details: ValueChangeDetails) => void;
    onSubmitComment?: () => void;
}