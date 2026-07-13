//NB this is one of the most important file in the application.
//the field names used should match the names of your validator.
//do something like this if you are not using validation schema
//like zod,yup etc

// import { PatientFormValues } from "../schemas/patient-schema";
// import { CreatePatientRequest } from "../types/create-patient-request";

// export function toCreatePatientRequest(
//   values: PatientFormValues
// ): CreatePatientRequest {
//   return {
//     firstName: values.firstName,
//     lastName: values.lastName,
//     preferredName: values.preferredName || undefined,

//     dateOfBirth: values.dateOfBirth,
//     gender: values.gender,
//     maritalStatus: values.maritalStatus,
//     nationalId: values.nationalId || undefined,
//     bloodGroup: values.bloodGroup,
//     religion: values.religion,
//     ethnicity: values.ethnicity,
//     occupation: values.occupation,
//     nationality: values.nationality,
//     preferredLanguage: values.preferredLanguage,

//     email: values.address.email,
//     phone: values.address.phone,
//     alternatePhone: values.address.alternatePhone,
//     addressLine1: values.address.line1,
//     addressLine2: values.address.line2,
//     city: values.address.city,
//     state: values.address.state,
//     country: values.address.country,
//     postalCode: values.address.postalCode,

//     nextOfKin: {
//       nextOfKinName: values.nextOfKin.name,
//       nextOfKinRelationship: values.nextOfKin.relationship,
//       nextOfKinPhone: values.nextOfKin.phone,
//       nextOfKinEmail: values.nextOfKin.email,
//     },

//     insurance: {
//       insuranceProvider: values.insurance.provider,
//       patientType: values.insurance.patientType,

//       insurancePolicyNumber: values.insurance.policyNumber,

//       insuranceExpringDate: values.insurance.expiryDate,
//     },
//     consentAccepted: values.consentToTreat,
//   };
// }
