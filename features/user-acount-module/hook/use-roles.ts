import { useQuery } from "@tanstack/react-query";
import { userAccessQueryKeys } from "../components/queries/user-access-query-keys";
import { rolesService } from "../services/roles.service";

export function useRoles() {
    return useQuery({
      queryKey: userAccessQueryKeys.roles(),
      queryFn: () => rolesService.getRoles(),
    });
  }