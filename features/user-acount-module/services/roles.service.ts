import { API_ROUTES } from "@/lib/api-routes";
import { RoleResponse } from "../types/user-access.types";
import { api } from "@/lib/axios";

//This role catalog will power the Assign Role dialog.
class RolesService {
  async getRoles(): Promise<RoleResponse[]> {
    const response = await api.get<RoleResponse[]>(API_ROUTES.ROLES.LIST);
    return response.data;
  }
}

export const rolesService = new RolesService();
