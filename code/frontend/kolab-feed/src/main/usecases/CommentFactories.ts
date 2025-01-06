import {
    ICommentData, 
} from '@/domain/models'

import { 
    UseCaseCreateComment,
    UseCaseDeleteComment, 
} from '@/main/usecases'

export function makeComment() {

    return {
        create: (commentData: ICommentData) => 
            UseCaseCreateComment(commentData),
        delete: (column: Record<string, number>) => 
            UseCaseDeleteComment(column),
    }
}