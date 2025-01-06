import { 
    Image,
} from '@chakra-ui/react'

import { Wrap } from './styles'

export function Hero(){
    return (
        <Wrap>
            <Image 
                src={`/logo.svg`}
                height='3rem' 
            />
        </Wrap>
    )
}