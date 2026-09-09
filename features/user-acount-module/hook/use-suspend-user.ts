import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountSuspensionService } from "../services/account-suspension";
import { userQueryKeys } from "../components/queries/user-access-query-keys";

export interface SuspendUserVariables {
  userId: string;
  currentUserId?: string;
}

export const useSuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: SuspendUserVariables) =>
      await accountSuspensionService.suspendUser(
        variables.userId,
        variables.currentUserId
      ),

    onSuccess: (_, variables) => {
      // Invalidate the full users list cache
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
      // Invalidate single user detail cache if open
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.detail(variables.userId),
      });
    },
  });
};
