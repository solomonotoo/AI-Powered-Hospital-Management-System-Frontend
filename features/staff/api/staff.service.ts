import { API_ROUTES } from "@/lib/api-routes";
import { api } from "@/lib/axios";
import { StaffQuery } from "../types/staff-query";
import { UpdateStaffRequest } from "../types/staff-update-request";
import { CreateStaffRequest } from "../types/staff-request";
import { ApiResponse } from "@/features/types/api-response";
import { PageResponse } from "@/features/types/page-response";
import { StaffResponse } from "../types/staff-response";

class StaffService {
  //create staff
  async createStaff(data: CreateStaffRequest) {
    const response = await api.post(API_ROUTES.STAFF.ROOT, data);
    return response.data.data;
  }

  // //get staff list data without parameter query
  // async getStaff() {
  //     const response = await api.get(API_ROUTES.STAFF.ROOT);
  //     return response.data.data;
  // }

  //get staff list data with parameter query
  async getStaff(query: StaffQuery) {
    const response = await api.get<ApiResponse<PageResponse<StaffResponse>>>(
      API_ROUTES.STAFF.ROOT
    );
    return response.data.data;
  }

  //get staff by id
  async getStaffById(id: string) {
    const response = await api.get<ApiResponse<PageResponse<StaffResponse>>>(
      API_ROUTES.STAFF.BY_ID(id)
    );
    return response.data.data;
  }

  //update staff
  async updateStaff(id: string, data: UpdateStaffRequest) {
    const response = await api.put<ApiResponse<PageResponse<StaffResponse>>>(
      API_ROUTES.STAFF.BY_ID(id),
      data
    );
    return response.data.data;
  }

  //delete staff
  async deleteStaff(id: string) {
    await api.delete(API_ROUTES.STAFF.BY_ID(id));
  }

  //get staff summary
  async getStaffSummary() {
    const response = await api.get(API_ROUTES.STAFF.ROOT + "/summary");
    return response.data.data;
  }
}

export const staffService = new StaffService();
