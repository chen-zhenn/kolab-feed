import { IModal } from './types'

import { 
    DialogTitle
} from '@/presentation/components'

export default function ModalTitle({
    title, 
}: IModal){
    return (
        <DialogTitle>
            { title }
        </DialogTitle>
    )
}