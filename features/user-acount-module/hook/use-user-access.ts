import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userAccessService } from "../services/user-access.service";
import { rolesService } from "../services/roles.service";
import {
  AssignRoleRequest,
  UpdateAssignmentRequest,
} from "../types/user-access.types";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";

//Query Hooks
export function useUserAccess(userId: string) {
  return useQuery({
    queryKey: userAccessQueryKeys.detail(userId),
    queryFn: () => userAccessService.getUserAccess(userId),
    enabled: Boolean(userId),
  });
}

//assign role
interface AssignUserRoleVariables {
  userId: string;
  data: AssignRoleRequest;
  currentUserId: string;
}

export function useAssignUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data, currentUserId }: AssignUserRoleVariables) =>
      userAccessService.assignRole(userId, data, currentUserId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userAccessQueryKeys.detail(variables.userId),
      });
    },
  });
}

//update role assignment
interface UpdateAssignmentVariables {
  userId: string;
  assignmentId: string;
  currentUserId: string;
  data: UpdateAssignmentRequest;
}

export function useUpdateUserRoleAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      assignmentId,
      currentUserId,
      data,
    }: UpdateAssignmentVariables) =>
      userAccessService.updateRole(userId, assignmentId, currentUserId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userAccessQueryKeys.detail(variables.userId),
      });
    },
  });
}

//Revoke role
interface RevokeAssignmentVariables {
  userId: string;
  assignmentId: string;
  currentUserId: string;
}

export function useRevokeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      assignmentId,
      currentUserId,
    }: RevokeAssignmentVariables) =>
      userAccessService.revokeRole(userId, assignmentId, currentUserId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userAccessQueryKeys.detail(variables.userId),
      });
    },
  });
}

// export function useUserPermissions(userId: string) {
//   return useQuery({
//     queryKey: userAccessQueryKeys.permissions(userId),
//     queryFn: () => userAccessService.getUserPermissions(userId),
//     enabled: Boolean(userId),
//   });
// }
