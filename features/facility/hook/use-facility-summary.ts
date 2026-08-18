import { useQuery } from "@tanstack/react-query";
import { facilityService } from "../api/facility.service";
import { FACILITY_KEYS } from "../api/facility.keys";

export function useFacilitySummary() {
  return useQuery({
    queryKey: FACILITY_KEYS.summary(),
    queryFn: async () => facilityService.getFacilitySummary(),

  });
}
