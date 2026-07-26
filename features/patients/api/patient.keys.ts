//NB one of the purpose of this file is to prevent us from hard coding of query keys like ["patients"]

import { PageQuery } from "@/features/types/api-query";
import { PatientVisitQuery } from "../types/visit";

// export const patientKeys = {
//   all: ["patients"] as const,
//   lists: () => [...patientKeys.all, "list"] as const,
//  // list: (filters: unknown) => [...patientKeys.lists(), filters] as const,
//   detail: (id: string) => [...patientKeys.all, id] as const,
// };

// all      // everything related to patients
// lists    // all patient list queries
// list()   // one specific patient list (based on filters)
// details  // all patient detail queries
// detail() // one specific patient

export const patientKeys = {
  all: ["patients"] as const, // Base key for all patient-related queries

  lists: () => [...patientKeys.all, "list"] as const, // Key for patient list queries
  //list: (filters: PatientFilters) => [...patientKeys.lists(), filters] as const, // Key for a filtered patient list (e.g., search, pagination, filters)
  list: (query: PageQuery) => [...patientKeys.lists(), query] as const, // Key for a filtered patient list (e.g., search, pagination, filters)

  details: () => [...patientKeys.all, "detail"] as const, // Base key for patient detail queries
  detail: (id: string) => [...patientKeys.details(), id] as const, // Key for a specific patient by ID
};

// export const patientVisitKeys ={
//   all:["patient-visits"] as const,
//   list:(query:PatientVisitQuery) => [
//     ...patientVisitKeys.all,
//     query.patientId,
//     query.search,
//     query.visitType,
//     query.status,
//     query.page,
//     query.size,
//     query.sortBy,
//     query.direction,
//   ] as const,
// }

export const patientVisitKeys ={
  all:["patient-visits"] as const,
  visits:(query:PatientVisitQuery) => [
    ...patientVisitKeys.all,
    query.patientId,
    query.search,
    query.visitType,
    query.status,
    query.page,
    query.size,
    query.sortBy,
    query.direction,
  ] as const,

 // or 

  // visits:(query:PatientVisitQuery) => [
  //   "patient-visits",
  //   query.patientId,
  //   query.search,
  //   query.visitType,
  //   query.status,
  //   query.page,
  //   query.size,
  //   query.sortBy,
  //   query.direction,
  // ] as const,


}
