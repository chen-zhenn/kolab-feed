 export type ActionType = 'edit' | 'cancel' | 'confirm' | 'submit' | 'upload'
 export type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '2xs' | undefined

 export interface IHandlers {
    onEdit?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
    onSubmit?: () => void;
    onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
    size?: Size;  
}