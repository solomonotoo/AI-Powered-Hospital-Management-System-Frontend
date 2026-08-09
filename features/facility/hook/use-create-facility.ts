import { useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "../api/facility.service";
import { CreateFacilityRequest } from "../types/facility-request";
import { FACILITY_KEYS } from "../api/facility.keys";

//Create Facility Hook

export function useCreateFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFacilityRequest) =>
      facilityService.createFacility(data),

    // Refetch ALL facility queries when a new facility is created
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FACILITY_KEYS.all, // Invalidates all ["facilities"] queries
      });
    },
  });
}

// Why invalidate: After creating a new facility, the list is now outdated.
// Invalidating forces React Query to refetch the latest data.
