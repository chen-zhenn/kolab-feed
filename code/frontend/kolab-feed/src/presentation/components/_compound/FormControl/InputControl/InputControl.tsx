import { forwardRef } from 'react'

import { 
    Input,
} from '@chakra-ui/react'

import { 
    Field,
} from '@/presentation/components'

import { 
    IInput, 
} from './types'

const InputControl = forwardRef<HTMLInputElement, IInput>(({
    label,
    errorText,
    status,
    ...props
}, ref) => {

    function renderInput(
        props?: IInput  
    ): React.ReactElement {

        return <Input 
            placeholder={props?.placeholder} 
            {...props} 
            ref={ref as React.Ref<HTMLInputElement>}   
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

export default InputControl