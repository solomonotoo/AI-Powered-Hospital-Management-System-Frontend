
//React Query Hooks.  
//Cache keys. React Query uses these keys to cache data. When you change a facility, 

import { FacilityQuery } from "../types/facility-query";

//you can invalidate all ["facilities"] keys to refetch fresh data
export const FACILITY_KEYS = {
    all: ["facilities"], //Base key
    //list: (query: any) => [...FACILITY_KEYS.all, "list", query], //for list
    //NB any change to PageQuery because since we are using PageQuery we have  to make the key
    // a strongly typed 
    list: (query: FacilityQuery) => [...FACILITY_KEYS.all, "list", query], //for list
    detail: (id: string) => [...FACILITY_KEYS.all, "detail", id], //for single item
    summary: () =>
        [...FACILITY_KEYS.all, "summary"],
} as const;  