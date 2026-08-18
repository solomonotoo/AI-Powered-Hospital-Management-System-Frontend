import { useQuery } from "@tanstack/react-query";
import { STAFF_KEYS } from "../api/staff.keys";
import { staffService } from "../api/staff.service";
import { StaffQuery } from "../types/staff-query";


export function useStaffSummary() {
    return useQuery({
        queryKey: STAFF_KEYS.summary(),
        queryFn: async () => staffService.getStaffSummary(),
        placeholderData: (previous) => previous, // Keeps old data while loading
    });
}
