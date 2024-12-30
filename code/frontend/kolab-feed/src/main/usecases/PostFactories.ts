import { IPostData } from '@/domain/models'

import { 
    UseCaseGetPost,
    UseCaseCreatePost,
    UseCaseReadPosts,
    UseCaseUpdatePost,
    UseCaseDeletePost,
    UseCaseFilteringPostByParams, 
} from '@/main/usecases'

import { 
    IHttpPostQueryParams, 
} from '@/main/services/protocols'

export function makePost() {

    return {
        getAll: (queryParams?: IHttpPostQueryParams) => 
            // UseCaseGetPost(queryParams),
            UseCaseReadPosts(),
        create: (postData: IPostData) => 
            UseCaseCreatePost(postData),
        update: (postData: IPostData) => 
            UseCaseUpdatePost(postData),
        delete: (column: Record<string, number>) => 
            UseCaseDeletePost(column),
        filterByParams: (queryParams: IHttpPostQueryParams) => 
            UseCaseFilteringPostByParams(queryParams),
    }
}