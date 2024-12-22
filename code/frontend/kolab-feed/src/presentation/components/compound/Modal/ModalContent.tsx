import { IModal } from './types'

import { 
    DialogBody,
} from '@/presentation/components'

export default function ModalContent({
    children, 
}: IModal){
    return (
        <DialogBody>
            { children }
        </DialogBody>
    )
}