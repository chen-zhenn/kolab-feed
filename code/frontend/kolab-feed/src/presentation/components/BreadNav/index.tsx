import { NavLink, useLocation } from 'react-router'

import { 
    BreadcrumbRoot,
    BreadcrumbLink,
 } from '@/presentation/components'

 import { Container } from './styles'

export function BreadNav(){

    const { pathname } = useLocation()

    function mount(): any[] {
        const levels = pathname
            .split('/')
            .filter(path => !!path.length)
        const links = levels
            .map(path=> `${path[0].toUpperCase()}${path.slice(1)}`)
            .map((path, index) => 
                ({ 
                    label: path,  
                    link: `/${levels.slice(0, index + 1).join('/')}`,
                    active: index !== levels.length - 1,  
                    navigable: index !== levels.length - 1 || levels.length < 2,  
                }))
        return links
    }

    return (
        <Container>
            <BreadcrumbRoot size='lg' >
                {
                    mount().map(item => (
                        <BreadcrumbLink key={item.link}>
                        <NavLink 
                            to={item.navigable ? item.link : pathname}
                            style={{ color: 'rgba(26, 32, 44, 1)' }}
                        >
                            {item.label}
                        </NavLink>
                        </BreadcrumbLink>
                    ))
                }
            </BreadcrumbRoot>
        </Container>

    )
}