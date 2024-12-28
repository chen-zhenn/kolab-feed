import { forwardRef } from 'react'

import { 
    Textarea,
} from '@chakra-ui/react'

import { 
    Field,
} from '@/presentation/components'

import { 
    IInput, 
} from './types'

const TextAreaControl = forwardRef<HTMLTextAreaElement, IInput>(({
    label,
    errorText,
    status,
    ...props
}, ref) => {

    function renderTextArea(
        props?: IInput  
    ): React.ReactElement {

        return <Textarea 
            placeholder={props?.placeholder} 
            {...props} 
            ref={ref as React.Ref<HTMLTextAreaElement>}   
            />
    }

    return (
        <Field 
            label={label}
            errorText={errorText} 
            {...status}
        >
            {renderTextArea(props)}
        </Field>
    )
})

export default TextAreaControl