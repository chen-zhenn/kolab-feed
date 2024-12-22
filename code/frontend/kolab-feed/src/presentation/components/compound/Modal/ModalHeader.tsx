import { IModal } from './types'

import { 
    DialogHeader
} from '@/presentation/components'

export default function ModalHeader({
    children, 
}: IModal){
    return (
        <DialogHeader>
            { children }
        </DialogHeader>
    )
}