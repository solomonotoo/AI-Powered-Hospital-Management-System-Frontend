import { PageQuery } from "@/features/types/api-query";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "../api/patient.service";
import { patientKeys } from "../api/patient.keys";

// export function usePatients(query:PageQuery){
//     return useQuery({
//         queryKey: ["patients",query],
//         queryFn: () => patientService.getPatients(query),
//         //If set, this value will be used as the placeholder data for this particular query observer while
//         // the query is still in the loading data and no initialData has been provided.
//         //what this means is that if page changes eg. page 1 -> page 2
//         //the old table remains visible until a new data arrives.
//         placeholderData: previous => previous,
//     })
// }

export function usePatients(query: PageQuery) {
  return useQuery({
    queryKey: patientKeys.list(query),
    queryFn: () => patientService.getPatients(query),
    placeholderData: (previous) => previous,
  });
}
