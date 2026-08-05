import { PatientFormValues } from "../schemas/patient-schema";

// export type CreatePatientRequest = PatientFormValues;


// export type UpdatePatientRequest = PatientFormValues;

export interface CreatePatientRequest {
    firstName: string;
    lastName: string;
    preferredName?: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup?: string;
    religion?: string;
    ethnicity?: string;
    nationality: string;
    maritalStatus: string;
    preferredLanguage?: string;
    contact: {
        email?: string;
        phone: string;
        alternatePhone?: string;
        address: {
            line1: string;
            line2?: string;
            city: string;
            state: string;
            country: string;
            postalCode?: string;
        };
    };
    nextOfKin: {
        name: string;
        relationship: string;
        relationshipOther?: string;
        phone: string;
        email?: string;
    };
    insurance: {
        patientType: string;
        provider?: string;
        policyNumber?: string;
        groupNumber?: string;
        expiryDate?: string;
    };
    consent: {
        consentToTreat: boolean;
        consentToShareData: boolean;
    };
}

export type UpdatePatientRequest = Partial<CreatePatientRequest>