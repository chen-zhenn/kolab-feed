import { IPostComment } from './types'

import { 
    ContentSection 
} from './styles'

export default function PostCommentContent({ 
    comment,
 }: IPostComment) {

    return (    
        <ContentSection>{comment}</ContentSection>
    )
}