export interface IStatus {
    invalid?: boolean; 
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
}

export interface IInput extends Omit<React.InputHTMLAttributes<HTMLInputElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    label?: string;
    errorText?: string;
    status?: IStatus;
}