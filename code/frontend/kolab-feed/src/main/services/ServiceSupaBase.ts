const { 
    VITE_SUPABASE_URL, 
} = import.meta.env

import { 
    IAuth, 
    IUsers,
    IPostData, 
} from '@/domain/models'

import { 
    SupaBaseClient,
    IHttpResponse,
    HttpStatusCode, 
} from '@/infra'

import { 
    ISupaBaseUser,
    HttpResponseHandler,
} from '@/main/services'

// import {} from '@/main/services'

export class ServiceSupaBase {
    private supabaseUrl = VITE_SUPABASE_URL

    constructor(readonly table: string) {
        this.table =  table
    }

    //================================================================//
    //=                      AUTH DATA                                //
    //================================================================//

    //-AUTH: LOGIN
    static async Login({ email, password }: IAuth) {
        const { data, error } = await SupaBaseClient.auth.signInWithPassword({
            email,
            password,
        })

        if(error) return HttpResponseHandler.handleError(error)

        return {
            data,
            status: HttpStatusCode.success,
            statusText: 'ok',
            message: ''
        } 
    }

    //-AUTH: GET USER
    static async getUser(): Promise<ISupaBaseUser | null> {
        const { data: { user } } = await SupaBaseClient.auth.getUser()
        return user
    }

    //================================================================//
    //=                      CREATE DATA                                //
    //================================================================//

    async create<T>(payload: T): Promise<IHttpResponse<T[]>> {
        let responseData: IHttpResponse<T[]> = {
            data: [],
            status: HttpStatusCode.servererror,
            statusText: '',
            message: ''
        } 
        return responseData
    }

    async updatePost<T>(payload: IPostData): Promise<IHttpResponse<IPostData[]>> {
        let users: IUsers[] = []
        let imagePath: string | null = null

        //-USER
        const currentUser = await ServiceSupaBase.getUser() 
        const response = await ServiceSupaBase.getUserById(currentUser?.id)
        users =  [...response.data]
    
        //-IMAGE STORAGE
        const { imageFile, ...newData } = payload as any
        if(imageFile) {
            const { data: storageData, error: uploadError } = await SupaBaseClient
            .storage
            .from('post-image')
            .upload(`${Date.now()}-${imageFile.name}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            })

            if (uploadError) return HttpResponseHandler.handleError(uploadError)

            imagePath = storageData && storageData.fullPath ? 
                `${this.supabaseUrl}/storage/v1/object/public/${storageData?.fullPath}` : 
                null
        }
        
        if(payload.id) {
            //-POST
            const { error } = await SupaBaseClient
                .from(this.table)
                .update([{ 
                    id: payload.id,
                    user_id: currentUser?.id,
                    image: imagePath,
                    ...newData,
                }])
                .eq('id', payload.id)
                .select()

            if(error) return HttpResponseHandler.handleError(error)
            return HttpResponseHandler.handleSuccess([], 200, 'Post atualizado com sucesso!')
        }
    
        //-POST
        const { data, error } = await SupaBaseClient
            .from(this.table)
            .insert([{ 
                ...newData,
                user_id: currentUser?.id,
                image: imagePath,
            }])
            .select()

            if(error) return HttpResponseHandler.handleError(error)
            return HttpResponseHandler.handleSuccess(data, 201, 'Post publicado com sucesso!')
    }

    //================================================================//
    //=                      READ DATA                                //
    //================================================================//

    async readAll<T>(): Promise<IHttpResponse<T[]>> {
        const { data, error } = await SupaBaseClient
            .from(this.table)
            .select(`
                *
            `)
        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess(data)
    }

    async readAllById<T>(user_id: string): Promise<IHttpResponse<T[]>> {
        const { data, error } = await SupaBaseClient
            .from(this.table)
            .select(`
                *
            `)
            .eq('userId', user_id)

        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess(data)
    }

    async readAllPost<T>(): Promise<IHttpResponse<T[]>> {

        const { data, error } = await SupaBaseClient
            .from(this.table)
            .select(`
                *,
                users(*),
                comments(*)
            `)
        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess(data)
    }

    async readPostById<T>(user_id: string): Promise<IHttpResponse<T[]>> {

        const { data, error } = await SupaBaseClient
            .from(this.table)
            .select(`
                *,
                users(*),
                comments(*)
            `)
            .eq('userId', user_id)

        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess(data)
    }

    static async getUserById(user_id?: string): Promise<any | null> {
        
        let id = user_id
        
        if(!id) {
            const user = await ServiceSupaBase.getUser()
            id = user?.id
        }

        const { data: usersData, error: usersError } = await SupaBaseClient
            .from('users')
            .select('*')
            .eq('user_id', id)

        if(usersError) return HttpResponseHandler.handleError(usersError)
        return HttpResponseHandler.handleSuccess<any[]>(usersData)
    }

    //================================================================//
    //=                      DELETE DATA                                //
    //================================================================//

    async delete<T>(column: Record<string, any>): Promise<IHttpResponse<T[]>> {
        
        const [key, value] = Object.entries(column)[0]
        
        const { error } = await SupaBaseClient
            .from(this.table)
            .delete()
            .eq(key, value)
        
        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess([], 204, 'Post deletado com sucesso!')
    }
}
