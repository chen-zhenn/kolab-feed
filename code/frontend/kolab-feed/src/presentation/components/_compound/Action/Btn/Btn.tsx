import { 
    LuCheck, 
    LuPencilLine,
    LuUpload, 
    LuX 
} from 'react-icons/lu'

import { 
    Button,
    FileUploadRoot,
    FileUploadTrigger
} from '@/presentation/components'


import {
    ActionType,
    IHandlers, 
    IBtn, 
} from './types'

export default function Btn({
    label, 
    actionType,
    state,
    habdlers,
 }: IBtn){
    
    function setButton(type?: ActionType, handlers?: IHandlers): React.ReactElement {
        const buttons = {
          edit: 
            <Button 
                variant='outline' 
                _hover={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                    borderColor: 'transparent'
                }}
                _focus={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                }}
                _focusVisible={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                }}
                onClick={handlers?.onEdit}
            >
                {label ?? 'Editar'}
                <LuPencilLine />
            </Button>,
          cancel: 
            <Button 
                variant='outline'  
                color='white' 
                backgroundColor='red.500'
                disabled={state?.disabled}
                _hover={{
                    outlineColor:'transparent',
                    borderColor: 'transparent',
                    outline: 'none',
                    color: 'red.700',
                }}
                  _focus={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                }}
                  _focusVisible={{
                      outlineWidth: '1px',
                      outlineColor:'transparent',
                }}
                onClick={handlers?.onCancel}
            >
                {label ?? 'Cancelar'}
                <LuX />
            </Button>,
          confirm: 
            <Button 
                variant='outline' 
                color='white' 
                backgroundColor='green.500'
                _hover={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                    borderColor: 'green.500',
                    color: 'green.700',
                    fontWeight: '700'
                }}
                  _focus={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                }}
                  _focusVisible={{
                      outlineWidth: '1px',
                      outlineColor:'transparent',
                }}
                onClick={handlers?.onConfirm}
            >
                {label}
                <LuCheck />
            </Button>,
            submit: 
                <Button
                    type='submit' 
                    variant='outline'
                    color='white' 
                    backgroundColor='green.500'
                    disabled={state?.disabled}
                    _hover={{
                        outlineColor:'transparent',
                        borderColor: 'transparent',
                        outline: 'none',
                        color: 'green.700',
                    }}
                      _focus={{
                        outlineWidth: '1px',
                        outlineColor:'transparent',
                    }}
                      _focusVisible={{
                          outlineWidth: '1px',
                          outlineColor:'transparent',
                    }}
                    onClick={handlers?.onSubmit}
                >
                    {label ?? 'Salvar'}
                    <LuCheck />
                </Button>,
            upload:
            <FileUploadRoot onFileAccept={handlers?.onUpload}>
                <FileUploadTrigger asChild>
                    <Button 
                        variant='surface'
                        aria-label='carregar arquivo'
                        disabled={state?.disabled}
                        _hover={{
                            outlineWidth: '1px',
                            outlineColor:'transparent',
                            borderColor: 'blue.500',
                            backgroundColor: 'blue.500',
                            color: 'white',
                        }}
                        _focus={{
                            outlineWidth: '1px',
                            outlineColor:'transparent',
                        }}
                        _focusVisible={{
                            outlineWidth: '1px',
                            outlineColor:'transparent',
                        }}
                    >
                        {label ?? 'Carregar arquivo'}
                        <LuUpload />
                    </Button>
                </FileUploadTrigger>
            </FileUploadRoot>,
            default: 
            <Button 
                variant='outline'
                color='white' 
                backgroundColor='blue.500'
                disabled={state?.disabled}
                _hover={{
                    outlineColor:'transparent',
                    borderColor: 'transparent',
                    outline: 'none',
                    color: 'blue.700',
                }}
                _focus={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                }}
                _focusVisible={{
                    outlineWidth: '1px',
                    outlineColor:'transparent',
                }}
                onClick={handlers?.onclick}
            >
                {label}
            </Button>,
        }

        return buttons[type ?? 'default']
    }

    return (
        <>{setButton(actionType, habdlers)}</>
    )
}