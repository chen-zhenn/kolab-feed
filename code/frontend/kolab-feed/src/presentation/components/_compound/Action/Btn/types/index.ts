 export type ActionType = 'edit' | 'cancel' | 'confirm' | 'submit' | 'upload'

 export interface IHandlers {
    onEdit?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
    onSubmit?: () => void;
    onclick?: () => void;
    onUpload?: (details: FileAcceptDetails) => void;
}

export interface IState {
    disabled?: boolean;
    loading?: boolean;
}

export interface IBtn {
    label?: string;
    loadingLabel?: string;
    children?: React.ReactNode; 
    actionType?: ActionType;
    state?: IState;
    handlers?: IHandlers;
    // size?:  
}