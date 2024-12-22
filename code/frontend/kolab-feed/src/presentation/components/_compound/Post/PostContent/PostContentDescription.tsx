import { Description } from './styles'
import { IPostContent } from './types'

export default function PostContentDescrition({
    description
}: IPostContent){
    return (
        <Description>{description}</Description>
    )
}