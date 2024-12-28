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
        const serviceSupaBase = new ServiceSupaBase('posts')
        const data = await queryParams?.user_id ? 
            serviceSupaBase.readPostById<IPost>(`${queryParams?.user_id}`) : 
            serviceSupaBase.readAllPost<IPost>()
        return data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export async function UseCaseCreatePost(postData: IPostData): Promise<IHttpResponse<IPostData[]>> {
    const serviceSupaBase = new ServiceSupaBase('posts')
    const data = await serviceSupaBase.updatePost<IPostData>(postData)
    return data
}

export async function UseCaseDeletePost(column: Record<string, any>): Promise<IHttpResponse<IPostData[]>> {
    const serviceSupaBase = new ServiceSupaBase('posts')
    const data = await serviceSupaBase.delete<IPostData>(column)
    return data
}
