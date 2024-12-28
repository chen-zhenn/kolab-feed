import { ILayout } from './types'
import {
    Header,
    Content,
    Sidebar,
    Footer,
    Container,
    Generic,
} from './styles'
import { memo } from 'react'

function LayoutModule({  
    type, 
    children,
}: ILayout ){

    const module = {
        header: 
            <Header>
               <Container>{children}</Container>
            </Header>,
        content: 
            <Content>
               <Container>{children}</Container>
            </Content>,
        sidebar: 
            <Sidebar>
                {children}
            </Sidebar>,
        footer: 
            <Footer>
              <Container>{children}</Container>
            </Footer>,
        generic: 
            <Generic>
                <Container>{children}</Container>
            </Generic>,
      }

      return ( module[type ?? 'generic'] )
}

export default memo(LayoutModule)