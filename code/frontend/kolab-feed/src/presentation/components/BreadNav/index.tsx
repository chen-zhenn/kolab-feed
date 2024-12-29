import { 
    NavLink, 
    useLocation,
    useParams,
} from 'react-router'

import { colors } from '@/presentation/theme'

import { 
    BreadcrumbRoot,
    BreadcrumbLink,
} from '@/presentation/components'

import { Container } from './styles'

export function BreadNav(){

    const { pathname } = useLocation()
    const params = useParams()

    function mount(): any[] {
        let levels = pathname
            .split('/')
            .filter(path => !!path.length)

        if(Object.keys(params)) {
            for(const key in params) 
                levels = levels.filter(level => level !== params[key])
        }

        const links = levels
            .map(path=> `${path[0].toUpperCase()}${path.slice(1)}`)
            .map((path, index) => 
                ({ 
                    label: path,  
                    link: `/${levels.slice(0, index + 1).join('/')}`,
                    active: index !== levels.length - 1,  
                    navigable: true,  
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
                            to={item.link}
                            style={{ color: colors.secondary500 }}
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