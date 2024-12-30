import { 
    IPost,
    IPostData 
} from '@/domain/models'

import { 
    IHttpParams, 
    IHttpResponse,
    AxiosHttpClient,
    HttpClient,
} from '@/infra'

import { 
    ServiceGetPost,
    ServiceSupaBase,
    IHttpPostQueryParams, 
} from '@/main/services'

const { 
    VITE_API_BASE_URL, 
} = import.meta.env


export async function UseCaseGetPost(queryParams?: IHttpPostQueryParams): Promise<IHttpResponse<IPost[]>> {

    const params: IHttpParams<IHttpPostQueryParams> = {
        baseURL: VITE_API_BASE_URL,
        url: '/posts',
        queryParams,
    }

    try {
        const httpInstance = AxiosHttpClient.getInstance(params)
        const httpClient = new HttpClient<IPost[], IHttpPostQueryParams>(httpInstance.httpClient)

        const serviceGetPost = new ServiceGetPost(params, httpClient)
        return await serviceGetPost.getAll()
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export async function UseCaseCreatePost(postData: IPostData): Promise<IHttpResponse<IPostData[]>> {
    const serviceSupaBase = new ServiceSupaBase('posts')
    const data = await serviceSupaBase.createPost<IPostData>(postData)
    return data
}

export async function UseCaseReadPosts(): Promise<IHttpResponse<IPostData[]>> {
    const serviceSupaBase = new ServiceSupaBase('posts')
    return await serviceSupaBase.readAllPost<IPost>()
}

export async function UseCaseUpdatePost(postData: IPostData): Promise<IHttpResponse<IPostData[]>> {
    const serviceSupaBase = new ServiceSupaBase('posts')
    const data = await serviceSupaBase.updatePost<IPostData>(postData)
    return data
}

export async function UseCaseDeletePost(column: Record<string, number>): Promise<IHttpResponse<IPostData[]>> {
    const serviceSupaBase = new ServiceSupaBase('posts')
    const data = await serviceSupaBase.deletePost<IPostData>(column)
    return data
}

export async function UseCaseFilteringPostByParams(
    queryParams: IHttpPostQueryParams
): Promise<IHttpResponse<IPostData[]>> {
    const serviceSupaBase = new ServiceSupaBase('posts')
    const data = await serviceSupaBase.filteringPostByParams<IPostData>(queryParams)
    return data
}
