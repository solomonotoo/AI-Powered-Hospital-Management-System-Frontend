//NB this mirror the api response from the spring boot dto

export type VisitType = "OPD" | "IPD" | "EMERGENCY";

export type VisitStatus =
  | "Completed"
  | "In Progress"
  | "Cancel"
  | "Checked In"
  | "Scheduled";

//PatientVisit represent one visit and this is the data type for a single patient visit
export interface PatientVisit {
  id: string;
  visitNumber: string;
  visitType: VisitType;
  department: string;
  clinic: string;
  clinician: string;
  status: VisitStatus;
  visitDate: string;
  chiefComplaint?: string;
}

//represent data and its type response return by the backend
export interface PatientVisitResponse {
  visits: PatientVisit[]; //array of visits by a single patient
  total: number; //total number of visit by a single patient
}

//represent the data and its type of the  query parameter we will send to the backend
export interface PatientVisitQuery {
  patientId: string;
  search?: string;
  visitType?: string;
  status?: string;
  page?: number;
  size?: number;
}
