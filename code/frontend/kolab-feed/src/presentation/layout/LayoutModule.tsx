import { ILayout } from './types'
import {
    Header,
    Content,
    Sidebar,
    Footer,
    Generic,
} from './styles'
import { memo } from 'react'

function LayoutModule({  
    type, 
    children,
}: ILayout ){

    const module = {
        header: <Header>{children}</Header>,
        content: <Content>{children}</Content>,
        sidebar: <Sidebar>{children}</Sidebar>,
        footer: <Footer>{children}</Footer>,
        generic: <Generic>{children}</Generic>,
      }

      return ( module[type ?? 'generic'] )
}

export default memo(LayoutModule)