import { PageQuery } from "@/features/types/api-query";

//for API query parameters for fetching facilities
export interface FacilityQuery extends PageQuery {
    category?: string;
    status?: string;
}