import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionsService } from "../services/permissions.service";
import { CreatePermissionRequest } from "../types/user-access.types";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";

/**
 * Mutation hook for registering a new permission code.
 * Automatically invalidates the permissions list query on success.
 */
export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePermissionRequest) =>
      permissionsService.createPermission(data),

    onSuccess: () => {
      // Invalidate the permissions catalog cache so the new permission appears in the list and role picker
      queryClient.invalidateQueries({
        queryKey: userAccessQueryKeys.permissionsList(),
      });
    },
  });
}
