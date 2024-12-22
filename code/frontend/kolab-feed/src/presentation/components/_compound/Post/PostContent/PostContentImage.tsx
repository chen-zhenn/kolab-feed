import { 
    Image,
} from '@chakra-ui/react'

import { IPostContent } from './types'
import { ImageContainer } from './styles'

export default function PostContentImage({
    imageSource
}: IPostContent){
    return (
        <ImageContainer>
            <Image 
                src={imageSource} 
                fit='contain'
                width='100%' 
            />
        </ImageContainer>
    )
}