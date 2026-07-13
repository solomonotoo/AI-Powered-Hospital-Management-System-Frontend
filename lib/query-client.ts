

//Hospitals don't want things like patient lists to be refetched every time someone switches browser tabs.
//having something like this helps alot

import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient(){
    return new QueryClient({
        defaultOptions:{
            queries:{
                retry: 1,
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 10,
                refetchOnWindowFocus: false,
            },
            mutations:{
                retry:1,
            }
        }
    })
}
