import { ValueChangeDetails } from '@zag-js/editable'

export type FieldTypes = 'input' | 'text'
export type TriggerTypes = 'edit' | 'cancel' | 'confirm'
export type Btn = React.ReactElement

export interface ITriggerElement {
    view: boolean;
    button?: Btn | null; 
}

export interface IHandlers {
    onConfirm?: (details: ValueChangeDetails) => void;
    onChange?: (details: ValueChangeDetails) => void;
}

export interface ITriggers {
    edit?: ITriggerElement;
    cancel?: ITriggerElement;
    confirm?: ITriggerElement;
}

export interface IEditableField {
    labelField: string;
    fieldType: FieldTypes;
    triggers: ITriggers;
    handlers?: IHandlers;
}