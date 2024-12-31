import { 
    memo, 
} from 'react'

import { 
    Section,
} from './styles'

import { ITopBar } from './types'

import { Partial } from './Partials'

function TopBarSection({ 
    type, 
    children, 
}: ITopBar) {

    const section: Record<string, any> = {
        burger: <Partial.TopBarBurger />,
        brand: <Partial.TopBarBrand />,
        search:<Partial.TopBarSearch />,
        profile: <Partial.TopBarProfile />,
        generic: <Section>{children}</Section>,
      }

    return ( section[type ?? 'generic'] )
}

export default memo(TopBarSection)