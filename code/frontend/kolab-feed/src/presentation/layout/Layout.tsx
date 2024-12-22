import { useContext } from 'react'

import { UIContext } from '@/states/context'

import { ILayout } from './types'

import { 
    Wrap, 
} from './styles'

export default function Layout({ 
  grid, 
  children 
}: ILayout){

  const uiState = useContext(UIContext)
  const { visibility } = uiState

    return (
        <Wrap 
          grid={grid ?? 'default'}
          className={ !visibility.sidebar ? '-expanded' : '' }
        >
          {children}
        </Wrap>
      )
}