import { 
    LuCheck, 
    LuPencilLine, 
    LuX 
} from 'react-icons/lu'

import {  
    IconButton, 
} from '@chakra-ui/react'


import {
    ActionType,
    IHandlers, 
    IBtn, 
} from './types'

export default function BtnIcon({ 
    actionType,
    habdlers,
 }: IBtn){
    
    function setIconButton(type: ActionType, handlers?: IHandlers): React.ReactElement {
        const buttons = {
          edit: 
            <IconButton 
                variant='ghost' 
                size='xs'
                onClick={handlers?.onEdit}
            >
                <LuPencilLine />
            </IconButton>,
          cancel: 
            <IconButton 
                variant='ghost' 
                size='xs' 
                color='white' 
                backgroundColor='red.500'
                onClick={handlers?.onCancel}
            >
                <LuX />
            </IconButton>,
          confirm: 
            <IconButton 
                variant='ghost' 
                size='xs' 
                color='white' 
                backgroundColor='green.500'
                onClick={handlers?.onConfirm}
            >
                <LuCheck />
            </IconButton>,
            submit: 
                <IconButton 
                    variant='ghost' 
                    size='xs' 
                    color='white' 
                    backgroundColor='green.500'
                    onClick={handlers?.onSubmit}
                >
                    <LuCheck />
                </IconButton>,
        }

        return buttons[type ?? 'edit']
    }

    return (
        <>{setIconButton(actionType, habdlers)}</>
    )
}