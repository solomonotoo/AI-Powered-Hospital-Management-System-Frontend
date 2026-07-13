import { PatientFormValues } from "./patient-schema";

// Default values used to initialize the form so every field is controlled
// from the start (avoids React's uncontrolled -> controlled input warning).
export const patientFormDefaultValues: Partial<PatientFormValues> = {
  // Step 1 — Personal & demographic info
  firstName: "",
  lastName: "",
  preferredName: "",
  dateOfBirth: "",
  gender: undefined,
  maritalStatus: undefined,
  email: "",
  nationalId: "",
  bloodGroup: undefined,
  religion: "",
  ethnicity: "",
  occupation: "",
  nationality: "",
  preferredLanguage: "",

  // Step 2 — Contact & address

  phone: "",
  alternatePhone: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },

  // Step 3 — Next of kin / emergency contact
  nextOfKin: {
    name: "",
    relationship: "",
    relationshipOther: "",
    phone: "",
    email: "",
  },

  // Step 4 — Insurance & registration type
  insurance: {
    patientType: "",
    provider: "",
    policyNumber: "",
    groupNumber: "",
    expiryDate: "",
  },

  // Step 5 — Consent & review
  consentToTreat: true,
  consentToShareData: false,
};
