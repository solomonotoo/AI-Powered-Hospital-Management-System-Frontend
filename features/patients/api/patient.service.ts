import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/api-routes";
import { CreatePatientRequest } from "../types/patient-request";
import { PatientResponse } from "../types/patient-response";
import { ApiResponse } from "@/features/types/api-response";
import { PageResponse } from "../types/patient-page";
import { PageQuery } from "@/features/types/api-query";
import { PatientSummary } from "../types/patient-summary";
//NB ALL HTTP REQUEST PATIENT LIVES IN THE FILE
//NB No React Query, No React Hook Form, Just HTTP

class PatientService {
  //you can refer to patient-service-old.ts for the previous.
  //the code is modified after introducing global api responses under types/api-response.ts

  //eg instead of const response = await api.get(...) we will now use axios generics as shown
  //in the code below

  //create a new patient thus post request
  async createPatient(data: CreatePatientRequest): Promise<PatientResponse> {
    const response = await api.post<ApiResponse<PatientResponse>>(
      API_ROUTES.PATIENTS.ROOT,
      data
    );
    return response.data.data;
  }

  //patient list thus get all request
  // async getPatients() {
  //   const response = await api.get<ApiResponse<PageResponse<PatientResponse>>>(
  //     API_ROUTES.PATIENTS.ROOT
  //   );

  //   return response.data.data;
  // }

  //all patient list updated with page query and patient summary
  //NB with params:query axios will automatically converts
  // {
  //   page:0,
  //   size:20,
  //   search:"Peter"
  //  }
   
  //  into
   
  //  ?page=0&size=20&search=Peter
   
  //  Exactly what Spring Boot wants.
  async getPatients(query: PageQuery) {
    const response = await api.get<ApiResponse<PageResponse<PatientSummary>>>(
      API_ROUTES.PATIENTS.ROOT,{
        params: query,
      }
    );

    return response.data.data;
  }

  //get patient by id get request
  async getPatient(id: string): Promise<PatientResponse> {
    const response = await api.get<ApiResponse<PatientResponse>>(
      API_ROUTES.PATIENTS.BY_ID(id)
    );
    return response.data.data;
  }

  //update patient by id put request
  async updatePatient(id: string, data: unknown) {
    const response = await api.put<ApiResponse<PatientResponse>>(
      API_ROUTES.PATIENTS.BY_ID(id),
      data
    );
    return response.data.data;
  }

  //delete patient by id delete request
  async deletePatient(id: string) {
    return await api.delete(API_ROUTES.PATIENTS.BY_ID(id));
  }
}

export const patientService = new PatientService();
