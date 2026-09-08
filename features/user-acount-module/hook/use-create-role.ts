import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesService } from "../services/roles.service";
import { CreateRoleRequest } from "../types/user-access.types";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";

interface CreateRoleVariables {
  data: CreateRoleRequest;
  currentUserId: string;
}

/**
 * Mutation hook for creating a new role.
 * Automatically invalidates the roles catalog query on success so dialogs and dropdowns update.
 */
export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, currentUserId }: CreateRoleVariables) =>
      rolesService.createRole(data, currentUserId),

    onSuccess: () => {
      // Invalidate the system roles catalog cache so new role appears in assign role dialogs immediately
      queryClient.invalidateQueries({
        queryKey: userAccessQueryKeys.roles(),
      });
    },
  });
}
