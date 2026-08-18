import { PageQuery } from "@/features/types/api-query";

//for API query parameters for fetching staff
export interface StaffQuery extends PageQuery {
  role?: string;
  status?: string;
  department?: string;
}
