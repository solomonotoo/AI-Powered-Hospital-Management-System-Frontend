import { useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService } from "../api/staff.service";
import { CreateStaffRequest } from "../types/staff-request";
import { STAFF_KEYS } from "../api/staff.keys";

export function useCreateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStaffRequest) => staffService.createStaff(data),

    // Refetch ALL staff queries when a new staff is created
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STAFF_KEYS.all, // Invalidates all ["staff"] queries
      });
    },
  });
}

// Why invalidate: After creating a new staff, the list is now outdated.
// Invalidating forces React Query to refetch the latest data
