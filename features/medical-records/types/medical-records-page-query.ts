import { SortState } from "@/features/patients/types/table";
import { PageQuery } from "@/features/types/api-query";

//NB this represent what the frontend send to the backend
export interface MedicalRecordPageQuery extends PageQuery{

    patientId:string;
    department?:string;
    encounterType?:string;
    status?:string;
}