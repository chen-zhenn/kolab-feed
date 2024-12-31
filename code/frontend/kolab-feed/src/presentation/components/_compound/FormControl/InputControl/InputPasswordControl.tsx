import { forwardRef } from 'react'

import { 
    Field,
    PasswordInput,
} from '@/presentation/components'

import { 
    IInput, 
} from './types'

const InputPassWordControl = forwardRef<HTMLInputElement, IInput>(({
    label,
    errorText,
    status,
    ...props
}, ref) => {

    function renderInput(
        props?: IInput  
    ): React.ReactElement {

        return <PasswordInput 
            placeholder={props?.placeholder}
            visible={!props?.secret} 
            {...props} 
            ref={ref as React.Ref<HTMLInputElement>}
            onVisibleChange={props?.handlers?.onVisibleChange}    
            />
    }

    return (
        <Field 
            label={label}
            errorText={errorText} 
            {...status}
        >
            {renderInput(props)}
        </Field>
    )
})

export default InputPassWordControl