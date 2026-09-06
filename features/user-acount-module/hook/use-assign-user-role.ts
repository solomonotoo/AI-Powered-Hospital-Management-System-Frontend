import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AssignRoleRequest } from "../types/user-access.types";
import { userAccessService } from "../services/user-access.service";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";

//assign role mutation
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

      // queryClient.invalidateQueries({
      //   queryKey: userAccessQueryKeys.permissions(variables.userId),
      // });

      // queryClient.invalidateQueries({
      //   queryKey: userAccessQueryKeys.access(variables.userId),
      // });
    },
  });
}
