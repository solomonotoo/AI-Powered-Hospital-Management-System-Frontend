// These are not form types.
// These represent responses from Spring Boot.

//this is used on Patient List.
//Note this is much smaller than registration schema because patient list doesn't 
//need insurance,consent,next of kin etc.

//this is also one of the most important files. The patient list should not download the
//entire patient record. Imagine GET /paitnes returns 10,000 patients and every patient include
//address,insurance,next of kin, consent. The table will become huge. This patient summary 
//will only give us what we need for the patient list not neccessary the entire record
export interface PatientSummary {
  id: string;
  mrn: string;
  fullName: string;

  gender: string;

  age: string;

  patientType: string;
  phone: string;

  active: boolean;
  lastVist?:string;
}



// Why this separation?
// Instead of downloading

// {
//   "nextOfKin": {},
//   "insurance": {},
//   "address": {},
//   ...
// }

// for every row,
// your backend returns

// {
//   "id": "...",
//   "mrn": "...",
//   "fullName": "...",
//   "age": 41,
//   "patientType": "OPD"
// }

// Much smaller.
// Much faster.
// Epic.
// Cerner.
// OpenMRS.
// All enterprise HMS systems do this.
