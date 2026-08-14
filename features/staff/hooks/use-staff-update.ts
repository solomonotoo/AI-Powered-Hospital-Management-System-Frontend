import { useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService } from "../api/staff.service";
import { CreateStaffRequest } from "../types/staff-request";
import { STAFF_KEYS } from "../api/staff.keys";
import { UpdateStaffRequest } from "../types/staff-update-request";

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStaffRequest }) =>
      staffService.updateStaff(id, data),

    // Refetch ALL staff queries when a new staff is created
    onSuccess: (_, variable) => {
      // Invalidate the specific staff detail query
      queryClient.invalidateQueries({
        queryKey: STAFF_KEYS.detail(variable.id),
      });

      //invalidates the list queries
      queryClient.invalidateQueries({
        queryKey: STAFF_KEYS.all,
      });
    },
  });
}

// Why invalidate: After creating a new staff, the list is now outdated.
// Invalidating forces React Query to refetch the latest data
