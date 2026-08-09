//Hospitals don't want things like patient lists to be refetched every time someone switches browser tabs.
//having something like this helps alot

import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Try failed request once more
        staleTime: 1000 * 60 * 5, // Data is "fresh" for 5 mins. 1000 * 60 * 5 can be replaced with 5 minutes
        gcTime: 1000 * 60 * 10, // Keep in cache for 10 mins
        refetchOnWindowFocus: false, // Don't refetch on tab switch
      },
      mutations: {
        retry: 1,
      },
    },
  });
}
