
//this file represent GET /patients/{id}

export interface PatientResponse{
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  gender: string;

  dateOfBirth: string;
  maritalStatus:string;
  nationality:string;
  bloodGroup?:string;
  religion?:string;
  ethnicity?:string;
  occupation?:string;
  preferredLanguage?:string;
  nationalId?:string;
  email?:string;
  phone: string;

  address:{
    line1:string;
    line2?:string;
    city:string;
    state:string;
    country:string;
    postalCode?:string;
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
  active: boolean;
  createdAt: string;
  updatedAt:string;

  //NB no consentToTreat
//   The frontend does not need to receive consent flags every time it loads a patient.

// Those belong to registration.
}