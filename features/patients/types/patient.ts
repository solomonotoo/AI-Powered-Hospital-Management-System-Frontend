//NB this represent the api response from the spring boot
export interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  middleName?:string;
  lastName: string;
  preferredName: string;
  gender: string;
  dateOfBirth: string;

  maritalStatus?: string;

  age: number;

  phoneNumber?: string;
  alternatePhoneNumber?: string;

  email?: string;

  nationality?: string;
  nationalId?: string;

  address?: string;
  city?: string;
  region?: string;
  country?: string;

  bloodGroup?: string;
  genotype?: string;

  status: "ACTIVE" | "INACTIVE" | "DECEASED";

  registeredAt: string;

  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;

  patientType: string;
}
