
//React Query Hooks.  
//Cache keys. React Query uses these keys to cache data. When you change a facility, 
//you can invalidate all ["facilities"] keys to refetch fresh data
export const FACILITY_KEYS = {
    all: ["facilities"], //Base key
    list: (query: any) => [...FACILITY_KEYS.all, "list", query], //for list
    detail: (id: string) => [...FACILITY_KEYS.all, "detail", id], //for single item
} as const; 