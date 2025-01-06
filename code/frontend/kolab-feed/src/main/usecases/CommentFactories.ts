import {
    ICommentData, 
} from '@/domain/models'

import { 
    UseCaseCreateComment,
    UseCaseUpdateComment,
    UseCaseDeleteComment, 
} from '@/main/usecases'

export function makeComment() {

    return {
        create: (commentData: ICommentData) => 
            UseCaseCreateComment(commentData),
        update: (commentData: ICommentData) => 
            UseCaseUpdateComment(commentData),
        delete: (column: Record<string, number>) => 
            UseCaseDeleteComment(column),
    }
}
