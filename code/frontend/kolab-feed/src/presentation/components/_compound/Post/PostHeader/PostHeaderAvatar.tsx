import { Avatar } from '@/presentation/components'
import { IPostHeader } from './types'
import { AvatarContainer } from './styles'

export default function PostHeaderAvatar({ 
    imageName, 
    imageSource,
    onClick, 
}: IPostHeader) {

    return (
        <AvatarContainer onClick={onClick}>
            <Avatar 
                name={imageName} 
                src={imageSource}
                size='xl' 
            />
        </AvatarContainer>
    )
}