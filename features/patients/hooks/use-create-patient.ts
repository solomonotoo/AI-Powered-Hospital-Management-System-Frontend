
import { useMutation } from "@tanstack/react-query";
import { patientService } from "../api/patient.service";
import { PatientFormValues } from "../schemas/patient-schema";
import { toCreatePatientRequest } from "../api/patient-mapper";

//NB study the pattern here
/**
 * before a create patient request (which is in a form of dto) works
 * 1. create a request interface with field (create-patient-request.ts)
 * 2. create a mapper function (patient-mapper.ts) with field but the field names here must match the
 * names used in schema validator eg.zod
 * 3. create a service class (patient.service.ts) that contains your http request or
 * you can put your http request directly in step 4
 *
 * 4. create a hook (use-create-patient.ts) with your business logic like what is in this file
 *
 * NB  it accepts PatientFormValues because that is what the form
 * actually produce. it internally converts it into CreatePatientRequest. This makes the
 * form ignorant of the mapper and the service too doesn't know about RHF
 */
export function useCreatePatient() {
  return useMutation({
    mutationFn: async (values: PatientFormValues) => {
      return patientService.createPatient(toCreatePatientRequest(values));
    },
  });
}

//basic example
// 1. Define the API fetching function
// const fetchUsers = async () => {
//     const response = await apiClient.get('/users');
//     return response.data;
//   };

//   // 2. Wrap it in a custom TanStack Query hook
//   export const useUsers = () => {
//     return useQuery({
//       queryKey: ['users'],
//       queryFn: fetchUsers,
//     });
//   };
