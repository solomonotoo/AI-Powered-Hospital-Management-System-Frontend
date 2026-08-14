import { StaffQuery } from "../types/staff-query";

export const STAFF_KEYS = {
  all: ["staff"], //Base key
  //list: (query: any) => [...FACILITY_KEYS.all, "list", query], //for list
  //NB any change to PageQuery because since we are using PageQuery we have  to make the key
  // a strongly typed
  list: (query: StaffQuery) => [...STAFF_KEYS.all, "list", query], //for list
  detail: (id: string) => [...STAFF_KEYS.all, "detail", id], //for single item
} as const;
