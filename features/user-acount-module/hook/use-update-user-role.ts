import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userAccessService } from "../services/user-access.service";
import { UpdateAssignmentRequest } from "../types/user-access.types";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";

export interface UpdateAssignmentVariables {
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