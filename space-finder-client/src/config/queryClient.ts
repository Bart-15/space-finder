import { QueryClient } from '@tanstack/react-query';

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 2 * (60 * 1000), // 2 mins, it depends
      },
    },
  }); // soon, will edit the global config
}

export const queryClient = generateQueryClient();
