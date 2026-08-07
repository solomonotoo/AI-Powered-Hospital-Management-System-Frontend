export const FACILITY_KEYS = {
    all: ["facilities"],
    list: (query: any) => [...FACILITY_KEYS.all, "list", query],
    detail: (id: string) => [...FACILITY_KEYS.all, "detail", id],
} as const; 