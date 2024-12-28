import { 
  Navigate,
  Outlet,
  redirect,
} from 'react-router'

import {
  Flex,
} from '@chakra-ui/react'

import {
  makeUser,  
} from '@/main/usecases'

import { colors } from '@/presentation/theme'

import { 
  GlobalStatesWrapper, 
} from '@/presentation/hoc'

import { Layout } from '@/presentation/layout'

import {  
  BreadNav,
  ProgressCircleRoot,
  ProgressCircleRing 
}  from '@/presentation/components'

import { 
  Header,
  Sidebar,
  Footer, 
}  from '@/presentation/includes'
import { useEffect, useState } from 'react'

function App() {

  const [authenticated, setAuthenticated] =  useState<boolean>(false)
  const [loading, setLoading] =  useState<boolean>(true)

  const user = makeUser()
 
  useEffect(() => {
    (async function(){
        const response = await user.get()
        const isAuthenticated = response?.role === 'authenticated'
        if(!response || !isAuthenticated) {
          setLoading(false)
          return redirect('/login')
        }
        setAuthenticated(isAuthenticated)
        setLoading(false)
    }())
  }, [user])


  if(loading && !authenticated) return (
    <Layout.Wrap>
      <Layout.Module>
      <Flex 
        justifyContent='center' 
        alignItems='center'
        height='100vh'
        backgroundColor={colors.primary}
      >
          <ProgressCircleRoot value={null}>
            <ProgressCircleRing cap='round' color={colors.secondary400} />
          </ProgressCircleRoot>
        </Flex>
      </Layout.Module>
    </Layout.Wrap>
  )

  return (
    <>
      {
        authenticated ? (
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
        ):  (
          <Navigate to='/login' />
        ) 
      }
    </>
  )
}

export default GlobalStatesWrapper(App)