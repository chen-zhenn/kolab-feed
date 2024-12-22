import { DialogOpenChangeDetails } from '@chakra-ui/react'

type motion = 'scale' | 'slide-in-bottom' | 'slide-in-top' | 'slide-in-left' | 'slide-in-right' | 'none'
type centered = 'true' | 'false'
type scrollBehavior = 'inside' | 'outside'

export interface IHandlers {
    onExitComplete?: () => void;
    onOpenChange: (details: DialogOpenChangeDetails) => void; 
}

export interface IModal {
    open?: boolean;
    children?: React.ReactNode;
    title?: string;
    centered?: centered;
    closeOnInteractOutside?: boolean;
    scrollBehavior?: scrollBehavior;
    motionPreset?: motion;
    initialFocusEl?:() =>  HTMLElement | null;
    handlers?: IHandlers
}