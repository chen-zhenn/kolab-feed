import { ValueChangeDetails } from '@zag-js/editable'

export type FieldTypes = 'input' | 'text'
export type TriggerTypes = 'edit' | 'cancel' | 'submit'
export type Btn = React.ReactElement

export interface ITriggerElement {
    view: boolean;
    button?: Btn | null; 
}

export interface IHandlers {
    onSubmit?: (details: ValueChangeDetails) => void;
    onChange?: () => void;
}

export interface ITriggers {
    edit?: ITriggerElement;
    cancel?: ITriggerElement;
    submit?: ITriggerElement;
}

export interface IEditableField {
    labelField: string;
    fieldType: FieldTypes;
    triggers: ITriggers;
    handlers?: IHandlers;
}