import { 
    IHttpResponse,
    HttpStatusCode, 
} from '@/infra'

import { 
    HttpStatusMessages,
    SupabaseErrorCodes,
    SupabaseStatusCode,
    SupabaseStatusMessage, 
} from '@/main/services'

export class HttpResponseHandler {

    static handleSuccess<T>(data: T[], code?: number | null, msg?: string): IHttpResponse<T[]> {
        return {
            status: code ?? HttpStatusCode.success,
            statusText: 'success',
            message: msg ?? '',
            data,
        }
    }

    static handleError(error?: any): IHttpResponse<[]> {
        const errorCode: SupabaseErrorCodes = error.code ?? 'UnknownError'
        const status = SupabaseStatusCode[errorCode] || HttpStatusCode.servererror
        const message = SupabaseStatusMessage[errorCode] ||  HttpStatusMessages.servererror
        return {
            status,
            statusText: 'error',
            message,
            data: [],
        }
    }
}