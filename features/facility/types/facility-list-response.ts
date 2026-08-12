import { FacilityResponse } from "./facility-response";


export interface FacilityListResponse {
    facilities: FacilityResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
    
