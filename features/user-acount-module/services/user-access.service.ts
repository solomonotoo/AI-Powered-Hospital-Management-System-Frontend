import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/api-routes";
import {
  AssignRoleRequest,
  RoleAssignmentResponse,
  RoleResponse,
  UpdateAssignmentRequest,
  UserAccessResponse,
} from "../types/user-access.types";

class UserAccessService {

  //endpoint for access and role pages
  async getUserAccess(userId: string): Promise<UserAccessResponse> {
    const response = await api.get<UserAccessResponse>(
      API_ROUTES.USERS.ACCESS(userId)
    );
    return response.data;
  }

  async getRoles(): Promise<RoleResponse[]> {
    const response = await api.get<RoleResponse[]>(API_ROUTES.ROLES.LIST);
    return response.data;
  }

  // async getUserRoles(userId: string): Promise<RoleAssignmentResponse[]> {
  //   const response = await api.get<RoleAssignmentResponse[]>(
  //     API_ROUTES.USERS.ROLES(userId)
  //   );
  //   return response.data;
  // }

  // async getUserPermissions(userId: string): Promise<string[]> {
  //   const response = await api.get<string[]>(
  //     API_ROUTES.USERS.PERMISSIONS(userId)
  //   );
  //   return response.data;
  // }

  //   The currentUserId query parameter is required by the generated operations for
  //   assigning, updating, and revoking assignments.

  async assignRole(
    userId: string,
    data: AssignRoleRequest,
    currentUserId: string
  ): Promise<RoleAssignmentResponse> {
    const response = await api.post<RoleAssignmentResponse>(
      API_ROUTES.USERS.ROLES(userId),
      data,
      {
        params: {
          currentUserId,
        },
      }
    );
    return response.data;
  }

  async updateRole(
    userId: string,
    assignmentId: string,
    currentUserId: string,
    data: UpdateAssignmentRequest
  ): Promise<void> {
    await api.put(
      API_ROUTES.USERS.ROLES_ASSIGNMENT(userId, assignmentId),
      data,
      {
        params: {
          currentUserId,
        },
      }
    );
  }

  async revokeRole(
    userId: string,
    assignmentId: string,
    currentUserId: string
  ): Promise<void> {
    await api.delete(API_ROUTES.USERS.ROLES_ASSIGNMENT(userId, assignmentId), {
      params: {
        currentUserId,
      },
    });
  }
}

export const userAccessService = new UserAccessService();
