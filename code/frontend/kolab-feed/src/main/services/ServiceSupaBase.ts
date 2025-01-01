const { 
    VITE_SUPABASE_URL, 
} = import.meta.env

import { 
    IAuth, 
    IUsers,
    IPostData,
    IUserData, 
} from '@/domain/models'

import { 
    SupaBaseClient,
    IHttpResponse,
    HttpStatusCode, 
} from '@/infra'

import { 
    ISupaBaseUser,
    HttpResponseHandler,
    IHttpPostQueryParams,
    ISupaBaseLogin,
} from '@/main/services'

export class ServiceSupaBase {
    private supabaseUrl = VITE_SUPABASE_URL
    
    constructor(readonly table: string) {
        this.table =  table
    }

    //================================================================//
    //=                      AUTH DATA                                //
    //================================================================//

    //-AUTH: LOGIN
    static async Login({ email, password }: IAuth): Promise<ISupaBaseLogin | any> {
        const { data, error } = await SupaBaseClient.auth.signInWithPassword({
            email,
            password,
        })

        if(error) return HttpResponseHandler.handleError(error)

        return {
            data,
            status: 200,
            statusText: 'ok',
            message: ''
        }
    }

    //-AUTH: LOGOUT
    static async Logout() {
        const { error } = await SupaBaseClient.auth.signOut()

        if(error) return HttpResponseHandler.handleError(error)

        return {
            status: 204,
            statusText: 'success',
            message: 'Desconectado com sucesso'
        } 
    }

    //-AUTH: GET USER
    static async getUserAuth(): Promise<ISupaBaseUser | null> {
        const { data: { user } } = await SupaBaseClient.auth.getUser()
        return user
    }


    static async getUsersById<T>(user_id?: string): Promise<IHttpResponse<T[]>> {
        if(!user_id) 
            return HttpResponseHandler
        .handleError({ error: { code: '22P02' } })
        
        const { data: usersData, error: usersError } = await SupaBaseClient
            .from('users')
            .select('*')
            .eq('user_id', user_id)

        if(usersError) return HttpResponseHandler.handleError(usersError)
        return HttpResponseHandler.handleSuccess(usersData)
    }

    //================================================================//
    //=                      CREATE DATA                                //
    //================================================================//

    async createPost<T>(payload: IPostData): Promise<IHttpResponse<IPostData[]>> {
        //-USER
        const newPayload = await this.handleUserPayload(payload)
        
        //-IMAGE STORAGE
        try {
            if(
                payload.imageFile && 
                payload.imageFile.type.includes('image')
            ) {
                const imagePath = await this.handleUploadImage(payload.imageFile, 'post-image')
                if(imagePath && !(imagePath instanceof Error)) newPayload.image = imagePath
            }
            if(typeof newPayload.image !== 'string') delete newPayload.image 
        } catch (error) {
            delete newPayload.image
        } finally {
            delete newPayload.imageFile
        }
        
        if(!newPayload.image) delete newPayload.image
        const { email, ...newData } = newPayload

        //-POST
        const { data, error } = await SupaBaseClient
            .from(this.table)
            .insert([newData])
            .select()

        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess<IPostData>(data, 201, 'Post publicado com sucesso!')
    }

   //================================================================//
    //=                      UPDATE DATA                                //
    //================================================================//

    async updatePost<T>(payload: IPostData): Promise<IHttpResponse<IPostData[]>> {
        
        //-USER
        const newPayload = await this.handleUserPayload(payload)

        if(payload.user_id !== newPayload.user_id) 
            return HttpResponseHandler.handleError({ code: '42501' })

        //-IMAGE STORAGE
        try {
            if(
                payload.imageFile && 
                payload.imageFile.type.includes('image')
            ) {
                const imagePath = await this.handleUploadImage(payload.imageFile, 'post-image')
                if(imagePath && !(imagePath instanceof Error)) newPayload.image = imagePath
            }
            if(typeof newPayload.image !== 'string') delete newPayload.image 
        } catch (error) {
            delete newPayload.image
        } finally {
            delete newPayload.imageFile
        }

        if(!newPayload.image) delete newPayload.image
        
        //-POST
        const { data, error } = await SupaBaseClient
            .from(this.table)
            .update([newPayload])
            .eq('id', newPayload.id)
            .select()

        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess<IPostData>(data, 200, 'Post atualizado com sucesso!')
    }

    async updateUser<T>(payload: IUserData): Promise<IHttpResponse<T[]>> {
        
        if(
            !payload || 
            !Object.keys(payload).length ||
            !payload.user_id || 
            !payload.email
        )
            return HttpResponseHandler
                .handleError({ error: { code: 'PGRST116' } })

        const { data: authUserData, error: authUserError } = await SupaBaseClient
            .auth
            .updateUser({
                email: payload.email,
            })

        if(authUserError) return HttpResponseHandler.handleError(authUserError)

        //-IMAGE STORAGE
        try {
            if(
                payload.imageFile && 
                payload.imageFile.type.includes('image')
            ) {
                const imagePath = await this.handleUploadImage(payload.imageFile, 'avatar-image')
                if(imagePath && !(imagePath instanceof Error)) payload.avatar = imagePath
            }

            if(typeof payload.avatar !== 'string') delete payload.avatar

        } catch (error) {
            delete payload.avatar
        } finally {
            delete payload.imageFile
        }

        const { id, ...newPayload } = payload

        const { data, error } = await SupaBaseClient
            .from(this.table)
            .update(newPayload)
            .eq('user_id', payload.user_id)
            .select()

        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess<T>(data, 200, 'Usuário atualizado com sucesso!')
    }

   //================================================================//
    //=                      READ DATA                                //
    //================================================================//

    async readAllPost<T>(): Promise<IHttpResponse<T[]>> {

        const { data: posts, error: postsError } = await SupaBaseClient
            .from(this.table)
            .select(`
                *,
                comments(*)
            `)
    
        if (postsError) return HttpResponseHandler.handleError(postsError)
    
        const usersIdList = posts
            .map(post => post.user_id)
            .filter(id => id !== null)

        const users_id = [...new Set(usersIdList)]

        const { data: users, error: usersError } = await SupaBaseClient
            .from('users')
            .select(`*`)
            .in('user_id', users_id)
    
        if (usersError) return HttpResponseHandler.handleError(usersError)
        
        const data = posts.map(post => ({
            ...post, 
            user: users.find(user => user.user_id === post.user_id), 
        }))

        return HttpResponseHandler.handleSuccess(data)
    }

    //================================================================//
    //=                      DELETE DATA                                //
    //================================================================//

    async deletePost<T>(column: Record<string, number>): Promise<IHttpResponse<T[]>> {
      
        const [key, value] = Object.entries(column)[0]

        const { data: posts, error: postsError } = await SupaBaseClient
            .from(this.table)
            .select(`user_id`)
            .eq(key, value)

        if(postsError) return HttpResponseHandler.handleError(postsError)

        if (posts) {
            const post_user_id = posts[0].user_id
            const userAuth = await this.handleUserPayload({ title: '', body: '' })
            if(post_user_id !== userAuth.user_id) 
                return HttpResponseHandler.handleError({ code: '42501' })
        } 
        
        const { error } = await SupaBaseClient
            .from(this.table)
            .delete()
            .eq(key, value)
        
        if(error) return HttpResponseHandler.handleError(error)
        return HttpResponseHandler.handleSuccess([], 204, 'Post deletado com sucesso!')
    }

    async filteringPostByParams<T>(
        column: Partial<Record<keyof IHttpPostQueryParams, string | number>>
    ): Promise<IHttpResponse<T[]>> {

        let query = SupaBaseClient
            .from(this.table)
            .select(`
                *,
                comments(*)
            `)

        if(Object.keys(column).length) {
            for(const [key, value] of Object.entries(column)) 
                if (value !== undefined) query = query.eq(key, value)
        }
        
        const { data: posts, error } = await query

        if(error) return HttpResponseHandler.handleError(error)

        if(!column.user_id) return HttpResponseHandler.handleSuccess(posts)

        const { data: users, error: usersError } = await SupaBaseClient
            .from('users')
            .select(`*`)
            .eq('user_id', column.user_id)

        if (usersError) return HttpResponseHandler.handleError(usersError)

        const data = posts?.map(post => ({
            ...post, 
            user: users.find(user => user.user_id === post.user_id), 
        }))

        return HttpResponseHandler.handleSuccess(data ?? [])
    }

    private async handleUploadImage(imageFile: File, bucket: string): Promise<string | Error | null> {
        
        const { data: storageData, error: uploadError } = await SupaBaseClient
            .storage
            .from(bucket)
            .upload(`${Date.now()}-${imageFile.name}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            })
    
        if (uploadError) return uploadError
    
        return storageData && storageData.fullPath
            ? `${this.supabaseUrl}/storage/v1/object/public/${storageData.fullPath}`
            : null
    }

    private async handleUserPayload(payload: IPostData): Promise<IPostData> {
        try {
            const userAuth = await ServiceSupaBase.getUserAuth()
            if (userAuth) {
                const { id: user_id, email } = userAuth
                return { ...payload, user_id }
            }
            return payload
        } catch (error) {
            return payload
        }
    } 
}
