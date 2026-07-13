import { useQuery } from "@tanstack/react-query";
import { patientService } from "../api/patient.service";
import { patientKeys } from "../api/patient.keys";

// export function usePatient(id:string){
//     return useQuery({
//         queryKey: ["patients",id],
//         queryFn: () => patientService.getPatient(id),
//         enabled: !! id,
//     });
// }

// the above code is correct and works well but we have already defined the query keys in /api/query-keys.ts
// and we are going to use that one

export function usePatient(id:string){
    return useQuery({
        queryKey: patientKeys.detail(id),
        queryFn:() => patientService.getPatient(id),

        enabled: !! id,
    })
}