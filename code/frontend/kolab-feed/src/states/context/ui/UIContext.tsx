import { createContext } from 'react'

import {
    IVisibility,
    IUIContext, 
} from './types'

export const initialState: IUIContext = {
    visibility: { sidebar: true },
    setVisibility: (state: IVisibility) => state,
}

export const UIContext = 
    createContext<IUIContext>(initialState)

UIContext.displayName = 'UIContext'