import { useQuery } from "@tanstack/react-query";
import { facilityService } from "../api/facility.service";
import { FACILITY_KEYS } from "../api/facility.keys";
import { FacilitySummaryMock } from "@/app/facility-mock-data";

export function useFacilitySummary() {
  return useQuery({
    queryKey: [...FACILITY_KEYS.all, "summary"],
    queryFn: async () => {
      try {
        return await facilityService.getFacilitySummary();
      } catch (error) {
        console.warn("Failed to fetch facility summary from API, falling back to mock data", error);
        return FacilitySummaryMock;
      }
    },
    placeholderData: FacilitySummaryMock,
  });
}
