// import { api } from "@/lib/axios";
// import { API_ROUTES } from "@/lib/api-routes";
// import { CreatePatientRequest } from "../types/patient-request";
// import { PatientResponse } from "../types/patient-response";
// //NB ALL HTTP REQUEST PATIENT LIVES IN THE FILE
// //NB No React Query, No React Hook Form, Just HTTP

// class PatientService {
//   // axios constructor and interceptors moved to axois.ts in project root directory
//   // constructor() {
//   //   this.api = axios.create({
//   //     baseURL: 'https://example.com',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //   });

//   //   // Optional: Interceptor to inject JWT tokens automatically
//   //   this.api.interceptors.request.use((config) => {
//   //     const token = localStorage.getItem('token');
//   //     if (token) config.headers.Authorization = `Bearer ${token}`;
//   //     return config;
//   //   });
//   // }

//   //NB without import from api.ts api.post(API.PATIENTS.ROOT, data);
//   //would have ben api.post("/patients", data);
//   async createPatient(data: CreatePatientRequest):Promise<PatientResponse> {
//     const response = await api.post(API_ROUTES.PATIENTS.ROOT, data);
//     return response.data;
//   }
//   async getPatients():Promise<PatientResponse> {
//     const response = await api.get(API_ROUTES.PATIENTS.ROOT);
//     return response.data;
//   }
//   async getPatient(id: string):Promise<PatientResponse> {
//     const response = await api.get(API_ROUTES.PATIENTS.BY_ID(id));
//     return response.data;
//   }
//   async updatePatient(id: string, data: unknown) {
//     const response = await api.put(API_ROUTES.PATIENTS.BY_ID(id), data);
//     return response.data;
//   }
//   async deletePatient(id: string) {
//     return await api.delete(API_ROUTES.PATIENTS.BY_ID(id));
//   }

//   // async getPatients() {
//   //   const response = await api.get("/");
//   //   return response.data;
//   // }

//   // async getPatient(id: string) {
//   //   const response = await api.get(`/${id}`);
//   //   return response.data;
//   // }

//   // async updatePatient(id: string, patientData: any) {
//   //   const response = await api.put(`/${id}`, patientData);
//   //   return response.data;
//   // }

//   // async deletePatient(id: string) {
//   //   const response = await api.delete(`/${id}`);
//   //   return response.data;
//   // }
// }

// export const patientService = new PatientService();
