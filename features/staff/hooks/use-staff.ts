import { useQuery } from "@tanstack/react-query";
import { StaffQuery } from "../types/staff-query";
import { STAFF_KEYS } from "../api/staff.keys";
import { staffService } from "../api/staff.service";

export function useStaff(query: StaffQuery) {
  return useQuery({
    queryKey: STAFF_KEYS.list(query),
    // queryFn: async () => staffService.getStaff(), //no parameter query
    queryFn: async () => staffService.getStaff(query), //with parameter query
    placeholderData: (previous) => previous,
  });
}
