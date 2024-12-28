import { IPostData } from '@/domain/models'

import { 
    UseCaseGetPost,
    UseCaseCreatePost,
    UseCaseDeletePost, 
} from '@/main/usecases'

import { 
    IHttpPostQueryParams, 
} from '@/main/services/protocols'

export function makePost() {

    return {
        getAll: (queryParams?: IHttpPostQueryParams) => 
            UseCaseGetPost(queryParams),
        create: (postData: IPostData) => UseCaseCreatePost(postData),
        delete: (column: Record<string, any>) => UseCaseDeletePost(column), 
    }
}