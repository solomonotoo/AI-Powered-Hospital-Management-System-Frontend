import { API_ROUTES } from "@/lib/api-routes";
import {
  CreateRoleRequest,
  RoleResponse,
} from "../types/user-access.types";
import { api } from "@/lib/axios";

/**
 * Service to manage system roles, catalogs, and role definitions.
 * Backed by OpenAPI endpoints:
 * - GET /api/v1/roles -> listRole
 * - POST /api/v1/roles -> createRole
 */
class RolesService {
  /**
   * Fetches the complete catalog of roles defined in the system.
   * Used to power the role selection in Assign Role dialog and the roles catalog list.
   */
  async getRoles(): Promise<RoleResponse[]> {
    const response = await api.get<RoleResponse[]>(API_ROUTES.ROLES.LIST);
    return response.data;
  }

  /**
   * Creates a new role with assigned permission codes.
   * Operation: POST /api/v1/roles?currentUserId=...
   * Request Body: CreateRoleRequest { name: string; description?: string; permissionCodes: string[] }
   * Response: RoleResponse { roleId, name, description, permissionCodes, systemDefined }
   *
   * @param data - The role creation payload containing name, description, and permission codes
   * @param currentUserId - The staffId of the authenticated user performing the creation
   */
  async createRole(
    data: CreateRoleRequest,
    currentUserId: string
  ): Promise<RoleResponse> {
    const response = await api.post<RoleResponse>(API_ROUTES.ROLES.LIST, data, {
      params: {
        currentUserId,
      },
    });
    return response.data;
  }

  /**
   * [ROOM FOR UPDATE]: Update an existing role definition.
   * Note: The backend OpenAPI schema does not yet define a PUT /api/v1/roles/{roleId} endpoint.
   * Once backend provides it, wire this method directly to:
   * await api.put(`${API_ROUTES.ROLES.LIST}/${roleId}`, data, { params: { currentUserId } });
   */
  async updateRole(
    roleId: string,
    data: Partial<CreateRoleRequest>,
    currentUserId: string
  ): Promise<RoleResponse> {
    // Placeholder for when backend adds PUT /api/v1/roles/{roleId}
    console.info(`[RolesService.updateRole] Pending backend endpoint for role ${roleId}`, {
      data,
      currentUserId,
    });
    throw new Error(
      "Role update is not yet supported by the backend API. Please contact the administrator."
    );
  }

  /**
   * [ROOM FOR DELETION]: Delete a role from the system.
   * Note: The backend OpenAPI schema does not yet define a DELETE /api/v1/roles/{roleId} endpoint.
   * Once backend provides it, wire this method directly to:
   * await api.delete(`${API_ROUTES.ROLES.LIST}/${roleId}`, { params: { currentUserId } });
   */
  async deleteRole(roleId: string, currentUserId: string): Promise<void> {
    // Placeholder for when backend adds DELETE /api/v1/roles/{roleId}
    console.info(`[RolesService.deleteRole] Pending backend endpoint for role ${roleId}`, {
      currentUserId,
    });
    throw new Error(
      "Role deletion is not yet supported by the backend API. System roles and custom roles cannot be deleted currently."
    );
  }
}

export const rolesService = new RolesService();
