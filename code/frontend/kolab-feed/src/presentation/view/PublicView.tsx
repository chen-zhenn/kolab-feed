import { Outlet } from 'react-router'
import { Layout } from '@/presentation/layout'
import {  Hero }  from '@/presentation/components'

function PublicView() {

  return (
    <Layout.Wrap grid='split-screen'>

      <Layout.Module>
        <Hero />
      </Layout.Module>

      <Layout.Module>
        <Outlet />
      </Layout.Module>

    </Layout.Wrap>
  )
}

export default PublicView
