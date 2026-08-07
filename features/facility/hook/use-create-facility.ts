import { useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "../api/facility.service";
import { CreateFacilityRequest } from "../types/facility-request";
import { FACILITY_KEYS } from "../api/facility.keys";


export function useCreateFacility() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateFacilityRequest) => facilityService.createFacility(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: FACILITY_KEYS.all,
            });
        },
    });
}