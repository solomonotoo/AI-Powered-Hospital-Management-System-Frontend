import { components } from "@/lib/api/generated/openapi-types";

export type UserAccessResponse = components["schemas"]["UserAccessResponse"];

export type RoleAssignmentResponse =
  components["schemas"]["RoleAssignmentResponse"];

export type RoleResponse = components["schemas"]["RoleResponse"];

export type AssignRoleRequest = components["schemas"]["AssignRoleRequest"];

export type UpdateAssignmentRequest =
  components["schemas"]["UpdateAssignmentRequest"];

export type PermissionsResponse = components["schemas"]["PermissionResponse"];

// Request payload for creating a new role
export type CreateRoleRequest = components["schemas"]["CreateRoleRequest"];

// Request payload for registering a new permission code in the system
export type CreatePermissionRequest =
  components["schemas"]["CreatePermissionRequest"];
