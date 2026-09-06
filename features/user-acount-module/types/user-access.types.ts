import { components } from "@/lib/api/generated/openapi-types";

export type UserAccessResponse = components["schemas"]["UserAccessResponse"];

export type RoleAssignmentResponse =
  components["schemas"]["RoleAssignmentResponse"];

export type RoleResponse = components["schemas"]["RoleResponse"];

export type AssignRoleRequest = components["schemas"]["AssignRoleRequest"];

export type UpdateAssignmentRequest =
  components["schemas"]["UpdateAssignmentRequest"];

//permissions type will be added later
export type PermissionsResponse = components["schemas"]["PermissionResponse"];
