import { API_ROUTES } from "@/lib/api-routes";
import { api } from "@/lib/axios";

class StaffService {

    //create staff
    async createStaff(data: any) {
        const response = await api.post(API_ROUTES.STAFF.ROOT, data);
        return response.data.data;
    }

    //get staff
    async getStaff() {
        const response = await api.get(API_ROUTES.STAFF.ROOT);
        return response.data.data;
    }

    //get staff by id
    async getStaffById(id: string) {
        const response = await api.get(API_ROUTES.STAFF.BY_ID(id));
        return response.data.data;
    }

    //update staff
    async updateStaff(id: string, data: any) {
        const response = await api.put(API_ROUTES.STAFF.BY_ID(id), data);
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