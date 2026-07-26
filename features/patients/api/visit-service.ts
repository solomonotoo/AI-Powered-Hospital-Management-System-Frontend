

//visit service this is where the business logic for making a request to the backend lives

import { API_ROUTES } from "@/lib/api-routes";
import { PatientVisitQuery, PatientVisitResponse } from "../types/visit";
import { api } from "@/lib/axios";


export const visitService ={
    async getPatientVisits(
        query:PatientVisitQuery
    ):Promise<PatientVisitResponse>{
        //API_ROUTE.PATIENT.VISITS(query.patientId) contains this url  `/patients/${query.patientId}/visits`,
        const {data} = await api.get(API_ROUTES.PATIENTS.VISITS(query.patientId),{
            params:{
                search:query.search,
                visitType:query.visitType,
                status:query.status,
                page: query.page,
                size:query.size,
                sortBy:query.sortBy,
                direction:query.direction,
            },
        });

        return data;
    }
}
