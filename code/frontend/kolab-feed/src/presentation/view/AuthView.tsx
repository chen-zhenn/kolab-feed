import { 
  Navigate,
  Outlet,
  redirect,
} from 'react-router'

import {
  Flex,
  Spinner,
} from '@chakra-ui/react'

import { IUsers } from '@/domain/models'

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

      try {
        const userAuth = await user.getUserAuth()
        const isAuthenticated = userAuth?.role === 'authenticated'
        if(!userAuth || !isAuthenticated) 
          return redirect('/login')
        setAuthenticated(isAuthenticated)
      } catch (error) {
        return redirect('/login')
      } finally {
        setLoading(false)
      }
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
        <Spinner 
          color={colors.secondary} 
          size='xl' 
          borderWidth='5px' 
        />
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