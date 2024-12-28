import { QueryClientProvider as Provider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryClient } from '@/infra/'
import { IProvider } from './types'

export function QueryClientProvider({ children }: IProvider) {
    return (
        <Provider client={ReactQueryClient}>
            <ReactQueryDevtools />
            {children}
        </Provider>
    )
}