// // NB this is the object the backend expects. Don't sent PatientFormValues directly to
// // spring boot. thus we don't have to send direct form values to the backend. this file
// // will rather talk to the backend.

// // Later, if your Spring Boot DTO changes, only this type and the mapper change.

// export interface CreatePatientRequest {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   preferredName?: string;

//   gender: string;

//   dateOfBirth: string;

//   nationalId?: string;
//   religion?: string;
//   ethnicity?: string;
//   occupation?: string;
//   nationality?: string;
//   preferredLanguage?: string;
//   maritalStatus?: string;
//   bloodGroup?: string;

//   email?: string;
//   phone: string;
//   alternatePhone?: string;
//   addressLine1: string;
//   addressLine2?: string;
//   city: string;
//   state: string;
//   country: string;
//   postalCode?: string;

//   nextOfKin: {
//     nextOfKinName: string;
//     nextOfKinRelationship?: string;
//     nextOfKinPhone: string;
//     nextOfKinEmail?: string;
//   };

//   insurance: {
//     insuranceProvider?: string;
//     patientType: string;

//     insurancePolicyNumber?: string;

//     insuranceExpringDate?: string;
//   };

//   consentAccepted: boolean;
// }
