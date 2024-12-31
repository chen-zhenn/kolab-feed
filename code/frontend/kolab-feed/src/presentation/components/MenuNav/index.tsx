import { 
    NavLink, 
} from 'react-router'

import { 
    Nav,
    Menu,
    MenuItem, 
} from './styles'

export function MenuNav(){
    return (
        <Nav>
            <Menu>
                <MenuItem>
                    <NavLink to='/feed'>Home</NavLink> 
                </MenuItem>
                <MenuItem>
                    <NavLink to='/posts'>Publicações</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='#dashboard'>Visão Geral</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/profile'>Perfil</NavLink>
                </MenuItem>
            </Menu>
        </Nav>
    )
}