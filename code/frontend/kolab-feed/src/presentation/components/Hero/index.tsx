const { 
    VITE_APP_BASE_URL 
} = import.meta.env

import { 
    Image,
} from '@chakra-ui/react'

import { Wrap } from './styles'

export function Hero(){
    return (
        <Wrap>
            <Image 
                src={`${VITE_APP_BASE_URL}/logo.svg`}
                height='3rem' 
            />
        </Wrap>
    )
}