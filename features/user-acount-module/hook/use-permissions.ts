import { useQuery } from "@tanstack/react-query";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";
import { permissionsService } from "../services/permissions.service";

export function usePermissions() {
  return useQuery({
    queryKey: userAccessQueryKeys.permissionsList(),
    queryFn: () => permissionsService.getPermissions(),
    staleTime: 60_000,
  });
}
