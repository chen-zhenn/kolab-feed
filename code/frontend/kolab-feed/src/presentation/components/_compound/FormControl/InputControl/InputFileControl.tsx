import { forwardRef } from 'react'

import { 
    LuUpload, 
} from 'react-icons/lu'

import {
    Wrap,
    Label, 
    Field, 
    Input,
    Placeholder,
} from './styles'

import { 
    IInput, 
} from './types'

const InputFileControl = forwardRef<HTMLInputElement, IInput>(({
    label,
    errorText,
    status,
    ...props
}, ref) => {

    function renderInput(
        props?: IInput  
    ): React.ReactElement {

        return <Input
            type='file'
            {...props}
            disabled={props?.status?.disabled}
            ref={ref as React.Ref<HTMLInputElement>}   
            onChange={props?.handlers?.onChange} 
            />
    }

    return (
        <Wrap>
            <Label>{label}</Label>
            <Field>
                {renderInput({ ...props, status })}
                <Placeholder htmlFor='file' disabled={status?.disabled}>
                    {props.placeholder}
                    <LuUpload />
                </Placeholder>
            </Field>
        </Wrap>
    )
})
export default InputFileControl