import { 
    ICommentData 
} from '@/domain/models'

import { 
    IHttpResponse,
} from '@/infra'

import { 
    ServiceSupaBase, 
} from '@/main/services'

export async function UseCaseCreateComment(commentData: ICommentData): Promise<IHttpResponse<ICommentData[]>> {
    const serviceSupaBase = new ServiceSupaBase('comments')
    const data = await serviceSupaBase.createComment<ICommentData>(commentData)
    return data
}
