import { 
  useState,
  useEffect,
  useContext, 
} from 'react'

import { 
  Navigate,
  Outlet,
  redirect,
} from 'react-router'

import {
  Spinner,
} from '@chakra-ui/react'

import { UIContext } from '@/states/context'

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
  OverlayTransition,
}  from '@/presentation/components'

import { 
  Header,
  Sidebar,
  Footer, 
}  from '@/presentation/includes'

function App() {

  const user = makeUser()
  const uiState = useContext(UIContext)
  const { visibility, setVisibility } = uiState
  const [authenticated, setAuthenticated] =  useState<boolean>(false)
  const [loading, setLoading] =  useState<boolean>(true)
 
  useEffect(() => {
    if (loading && !authenticated) {
      setVisibility({ 
        sidebar: false, 
        transition: 'enter', 
      })
    }
    setTimeout(() => {
      setVisibility({ 
        sidebar: true, 
        transition: 'enter', 
      })
    }, 1500)
  }, [loading, authenticated])

  useEffect(() => {
    (async function(){

      try {
        const userAuth = await user.getUserAuth()
        const isAuthenticated = userAuth?.role === 'authenticated'
        if(!userAuth || !isAuthenticated) {
          return redirect('/login')
        }
        setAuthenticated(isAuthenticated)
      } catch (error) {
        return redirect('/login')
      } finally {
        setLoading(false)
      }
    }())
  }, [user])

  if(loading && !authenticated) return (
    <>
      <Spinner 
        size='xl' 
        position='absolute'
        top='50%'
        left='50%'
        color={colors.secondary} 
        zIndex={99} 
      />
      <OverlayTransition  animate={visibility.transition} />
    </>
  )

  return (
    <>
      {
        authenticated ? (
          <>
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
          <OverlayTransition  animate={visibility.transition} />
          </>
        ):  (
          <Navigate to='/login' />
        ) 
      }
    </>
  )
}

export default GlobalStatesWrapper(App)