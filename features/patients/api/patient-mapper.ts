//NB this is one of the most important file in the application.
//the field names used should match the names in your schema like zod schema
//this is because your schema is very close to your backend(spring boot)

import { PatientFormValues } from "../schemas/patient-schema";
import { CreatePatientRequest } from "../types/patient-request";

export function toCreatePatientRequest(values: PatientFormValues):CreatePatientRequest {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    preferredName: values.preferredName || undefined,

    dateOfBirth: values.dateOfBirth,
    gender: values.gender,
    bloodGroup: values.bloodGroup,
    religion: values.religion,
    ethnicity: values.ethnicity,
    nationality: values.nationality,
    maritalStatus: values.maritalStatus,
    preferredLanguage: values.preferredLanguage,

    // nationalId: values.nationalId || undefined,
    // occupation: values.occupation,

    contact: {
      email: values.email,
      phone: values.phone,
      alternatePhone: values.alternatePhone,
      address: values.address,
    },

    //these variables are now part of address
    // addressLine1: values.address.line1,
    // addressLine2: values.address.line2,
    // city: values.address.city,
    // state: values.address.state,
    // country: values.address.country,
    // postalCode: values.address.postalCode,

    nextOfKin: values.nextOfKin,
    insurance: values.insurance,

    // nextOfKin: {
    //   nextOfKinName: values.nextOfKin.name,
    //   nextOfKinRelationship: values.nextOfKin.relationship,
    //   nextOfKinPhone: values.nextOfKin.phone,
    //   nextOfKinEmail: values.nextOfKin.email,
    // },

    // insurance: {
    //   insuranceProvider: values.insurance.provider,
    //   patientType: values.insurance.patientType,

    //   insurancePolicyNumber: values.insurance.policyNumber,

    //   insuranceExpringDate: values.insurance.expiryDate,
    // },

    consent: {
      consentToTreate: values.consentToTreat,
      consentToShareData: values.consentToShareData,
    },
  };
}


