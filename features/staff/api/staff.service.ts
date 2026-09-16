import { API_ROUTES } from "@/lib/api-routes";
import { api } from "@/lib/axios";
import { StaffQuery } from "../types/staff-query";
import { UpdateStaffRequest } from "../types/staff-update-request";
import { CreateStaffRequest } from "../types/staff-request";
import { ApiResponse } from "@/features/types/api-response";
import { PageResponse } from "@/features/types/page-response";
import { StaffResponse, StaffSummaryResponse } from "../types/staff-response";

class StaffService {
  // Create staff
  async createStaff(data: CreateStaffRequest) {
    const response = await api.post<ApiResponse<StaffResponse>>(API_ROUTES.STAFF.ROOT, data);
    return response.data.data;
  }

  // Get staff list data with parameter query
  async getStaff(query?: StaffQuery) {
    const response = await api.get<ApiResponse<PageResponse<StaffResponse>>>(
      API_ROUTES.STAFF.ROOT,
      { params: query }
    );
    return response.data.data;
  }

  // Get staff by id
  async getStaffById(id: string) {
    const response = await api.get<ApiResponse<StaffResponse>>(
      API_ROUTES.STAFF.BY_ID(id)
    );
    return response.data.data;
  }

  // Update staff
  async updateStaff(id: string, data: UpdateStaffRequest) {
    const response = await api.put<ApiResponse<StaffResponse>>(
      API_ROUTES.STAFF.BY_ID(id),
      data
    );
    return response.data.data;
  }

  // Delete / deactivate staff
  async deleteStaff(id: string) {
    await api.delete(API_ROUTES.STAFF.BY_ID(id));
  }

  // Get staff summary
  async getStaffSummary() {
    const response = await api.get<ApiResponse<StaffSummaryResponse>>(API_ROUTES.STAFF.SUMMARY);
    return response.data.data;
  }
}

export const staffService = new StaffService();
