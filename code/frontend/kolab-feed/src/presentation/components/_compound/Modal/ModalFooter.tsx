import { IModal } from './types'

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
            <DialogActionTrigger asChild>
                <Button 
                    variant='outline'
                    color='white' 
                    backgroundColor='blue.400'
                    >
                        Cancel
                </Button>
            </DialogActionTrigger>
            {children}
        </DialogFooter>
    )
}