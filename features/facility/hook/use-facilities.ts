import { PageQuery } from "@/features/types/api-query";
import { useQuery } from "@tanstack/react-query";
import { facilityService } from "../api/facility.service";
import { FACILITY_KEYS } from "../api/facility.keys";

export function useFacilities(query: PageQuery) {
  return useQuery({
    queryKey: FACILITY_KEYS.list(query),
    queryFn: () => facilityService.getFacilities(query),
    placeholderData: (previous) => previous,
  });
}
