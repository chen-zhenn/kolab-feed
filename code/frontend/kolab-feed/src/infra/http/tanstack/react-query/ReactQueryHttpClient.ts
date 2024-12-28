import { QueryClient } from '@tanstack/react-query'

export const ReactQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
})