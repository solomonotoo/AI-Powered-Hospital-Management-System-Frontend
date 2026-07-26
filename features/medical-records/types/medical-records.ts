

export type MedicalRecordStatus = 
| "ACTIVE"
| "ARCHIVED"
| "PENDING";
 
export type encounterType =
    | "OPD"
    | "IPD"
    | "EMERGENCY";
//NB this represent the api response DTO from the spring boot
// export interface MedicalRecord{
//     id:string;
//     medicalRecordNumber: string;
//     patientId:string;
//     diagnosis:string;
//     diagnosisCode?:string;
//     attendingDoctor:string;
//     department:string;
//     encounter:encounterType
//     visitDate:string;
//     status: MedicalRecordStatus
//     createdAt: string;
//     updatedAt:string;
// }

export interface MedicalRecord{
    id:string;
    medicalRecordNumber: string;
    patientId:string;
    firstName:string;
    lastName:string;
    dateOfBirth:string;
    gender:string;
    phone:string;
    email:string;
    diagnosis:string;
    provider:{
        id:string;
        name:string;
        specialty:string;
    };
    chiefComplaint:string;
    primaryDiagnosis?:string;
    secondaryDiagnoses?:string[];
    attendingDoctor:string;
    department:string;
    encounterType:encounterType
    visitDate:string;
    status: MedicalRecordStatus
    createdAt: string;
    updatedAt:string;

    
}