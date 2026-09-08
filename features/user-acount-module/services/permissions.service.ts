import { API_ROUTES } from "@/lib/api-routes";
import { api } from "@/lib/axios";
import {
  CreatePermissionRequest,
  PermissionsResponse,
} from "../types/user-access.types";

/**
 * Service to manage system permissions catalog.
 * Backed by OpenAPI endpoints:
 * - GET /api/v1/permissions -> listPermission
 * - POST /api/v1/permissions -> createPermission
 */
class PermissionsService {
  /**
   * Fetches the complete catalog of permissions defined in the system.
   * Used to populate effective permission matrix and permission selection lists.
   */
  async getPermissions(): Promise<PermissionsResponse[]> {
    const response = await api.get<PermissionsResponse[]>(
      API_ROUTES.PERMISSIONS.LIST
    );
    return response.data;
  }

  /**
   * Creates/registers a new permission code in the system catalog.
   * Operation: POST /api/v1/permissions
   * Request Body: CreatePermissionRequest { code: string; description?: string }
   *
   * @param data - The permission payload containing unique uppercase code and optional description
   */
  async createPermission(data: CreatePermissionRequest): Promise<void> {
    await api.post(API_ROUTES.PERMISSIONS.LIST, data);
  }

  /**
   * [ROOM FOR UPDATE]: Update an existing permission description.
   * Note: The backend OpenAPI schema does not yet define a PUT /api/v1/permissions/{code} endpoint.
   * Once backend provides it, wire this method directly to:
   * await api.put(`${API_ROUTES.PERMISSIONS.LIST}/${code}`, data);
   */
  async updatePermission(
    code: string,
    data: Partial<CreatePermissionRequest>
  ): Promise<void> {
    // Placeholder for when backend adds PUT /api/v1/permissions/{code}
    console.info(`[PermissionsService.updatePermission] Pending backend endpoint for code ${code}`, data);
    throw new Error(
      "Permission update is not yet supported by the backend API. Please contact the administrator."
    );
  }

  /**
   * [ROOM FOR DELETION]: Delete a permission code from the system catalog.
   * Note: The backend OpenAPI schema does not yet define a DELETE /api/v1/permissions/{code} endpoint.
   * Once backend provides it, wire this method directly to:
   * await api.delete(`${API_ROUTES.PERMISSIONS.LIST}/${code}`);
   */
  async deletePermission(code: string): Promise<void> {
    // Placeholder for when backend adds DELETE /api/v1/permissions/{code}
    console.info(`[PermissionsService.deletePermission] Pending backend endpoint for code ${code}`);
    throw new Error(
      "Permission deletion is not yet supported by the backend API."
    );
  }
}

export const permissionsService = new PermissionsService();
