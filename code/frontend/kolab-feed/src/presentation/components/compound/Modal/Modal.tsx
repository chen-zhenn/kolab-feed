import { IModal } from './types'

import { 
    DialogRoot,
    DialogContent,
    DialogCloseTrigger, 
} from '@/presentation/components'

export default function Modal({
    open, 
    children,
    closeOnInteractOutside,
    scrollBehavior,
    motionPreset,
    initialFocusEl,
    handlers, 
}: IModal){

    return (
        <DialogRoot 
            open={open}
            closeOnInteractOutside={closeOnInteractOutside}
            scrollBehavior={scrollBehavior}
            motionPreset={motionPreset}
            initialFocusEl={initialFocusEl}
            onExitComplete={handlers?.onExitComplete}
            onOpenChange={handlers?.onOpenChange}
        >
            <DialogContent>
                { children }
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}