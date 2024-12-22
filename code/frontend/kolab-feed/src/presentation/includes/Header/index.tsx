import { 
    TopBar,
}  from '@/presentation/components'

export default function Header(){
    return (
        <TopBar.Container>
            <TopBar.Section type='burger' />
            <TopBar.Section type='brand' />
            <TopBar.Section type='search' />
            <TopBar.Section type='profile' />
        </TopBar.Container>
    )
}
 