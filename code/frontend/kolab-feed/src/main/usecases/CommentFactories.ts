import {
    ICommentData, 
} from '@/domain/models'

import { 
    UseCaseCreateComment, 
} from '@/main/usecases'

export function makeComment() {

    return {
        create: (commentData: ICommentData) => 
            UseCaseCreateComment(commentData),
    }
}