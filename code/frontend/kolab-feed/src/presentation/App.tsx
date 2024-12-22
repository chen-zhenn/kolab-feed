import { Outlet } from 'react-router'

import { 
  GlobalStatesWrapper, 
} from '@/presentation/hoc'

import { Layout } from '@/presentation/layout'

import {  
  BreadNav, 
}  from '@/presentation/components'

import { 
  Header,
  Sidebar,
  Footer, 
}  from '@/presentation/includes'

function App() {
  
  return (
      <Layout.Wrap grid='golden-ratio'>

        <Layout.Module type='header'>
          <Header />
        </Layout.Module>

        <Layout.Module type='content'>
          <BreadNav />
          <Outlet />
        </Layout.Module>

        <Layout.Module type='sidebar'>
            <Sidebar />
        </Layout.Module>

        <Layout.Module type='footer'>
            <Footer />
        </Layout.Module>

      </Layout.Wrap>
  )
}

export default GlobalStatesWrapper(App)