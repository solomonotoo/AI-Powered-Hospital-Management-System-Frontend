import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userAccessService } from "../services/user-access.service";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";

//revoke mutations
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

      // queryClient.invalidateQueries({
      //   queryKey: userAccessQueryKeys.permissions(variables.userId),
      // });

      // queryClient.invalidateQueries({
      //   queryKey: userAccessQueryKeys.access(variables.userId),
      // });
    },
  });
}
