import { 
    useMemo, 
    useState, 
} from 'react'
import { IVisibility } from './types'
import { 
    UIContext,
} from './UIContext'

interface IUIProvider {
    children: React.ReactNode;
} 

export function UIStateProvider({ children }: IUIProvider): React.ReactNode {
    const [visibility, setVisibility] = useState<IVisibility>({ sidebar: true, })
    const value = useMemo(() => ({
        visibility, 
        setVisibility,
    }), [visibility])
    
    return ( 
        <UIContext.Provider 
            value= {value}
        >
            {children}
        </UIContext.Provider> 
    )
}