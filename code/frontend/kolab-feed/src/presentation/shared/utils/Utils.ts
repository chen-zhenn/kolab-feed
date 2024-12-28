import { 
    IHttpResponse,
} from '@/infra'

import { 
    toaster,
} from '@/presentation/components'

export class Utils {

    static launchToast<T>(response: IHttpResponse<T>) {
        toaster.create({
            type: response.statusText ?? 'info',
            title: response.message ?? '',
            duration: 7500, 
        })
    }
}