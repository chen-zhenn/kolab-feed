import { IModal } from './types'

import {  
} from '@chakra-ui/react'

import { 
    DialogFooter,
    DialogActionTrigger,
    Button,
} from '@/presentation/components'

export default function ModalFooter({
    children,
}: IModal){
    return (
        <DialogFooter>
            {children}
            <DialogActionTrigger asChild>
                <Button 
                    variant='outline'
                    color='white' 
                    backgroundColor='blue.500'
                    >
                        Fechar
                </Button>
            </DialogActionTrigger>
        </DialogFooter>
    )
}