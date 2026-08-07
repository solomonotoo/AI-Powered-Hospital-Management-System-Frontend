

//create a new facility 

// NB
//this will first map the facility form values to 
//the create facility request type using facility-mapper.ts
//then create facility using axios and api.ts

// NB : No React Query, No React Hook Form, Just HTTP

import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/api-routes";
import { ApiResponse } from "@/features/types/api-response";
import { PageQuery } from "@/features/types/api-query";
import { CreateFacilityRequest } from "../types/facility-request";
import { FacilityResponse } from "../types/facility-response";
import { PageResponse } from "@/features/types/page-response";
import { FacilityWorkSpaceSummary } from "../components/facility-workspace-summary";

class FacilityService {
    //create a new facility
    async createFacility(data: CreateFacilityRequest): Promise<FacilityResponse> {
        const response = await api.post<ApiResponse<FacilityResponse>>(
            API_ROUTES.FACILITIES.ROOT,
            data
        );
        return response.data.data;
    }
    //facility list
    async getFacilities(query: PageQuery): Promise<PageResponse<FacilityResponse>> {
        const response = await api.get<ApiResponse<PageResponse<FacilityResponse>>>(
            API_ROUTES.FACILITIES.ROOT,
            { params: query }
        );
        return response.data.data;
    }
    //get facility by id
    async getFacilityById(id: string): Promise<FacilityResponse> {
        const response = await api.get<ApiResponse<FacilityResponse>>(
            API_ROUTES.FACILITIES.BY_ID(id)
        );
        return response.data.data;
    }
    //update facility
    async updateFacility(id: string, data: CreateFacilityRequest): Promise<FacilityResponse> {
        const response = await api.put<ApiResponse<FacilityResponse>>(
            API_ROUTES.FACILITIES.BY_ID(id),
            data
        );
        return response.data.data;
    }
    //delete facility
    async deleteFacility(id: string): Promise<void> {
        await api.delete(API_ROUTES.FACILITIES.BY_ID(id));
    }
    //get facility summary statistics
    async getFacilitySummary(): Promise<FacilityWorkSpaceSummary> {
        const response = await api.get<ApiResponse<FacilityWorkSpaceSummary>>(
            `${API_ROUTES.FACILITIES.ROOT}/summary`
        );
        return response.data.data;
    }
}

export const facilityService = new FacilityService();