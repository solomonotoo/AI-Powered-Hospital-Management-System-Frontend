import { MedicalRecord } from "./types/medical-records";

// export type MedicalRecordStatus = 
// | "ACTIVE"
// | "ARCHIVED"
// | "PENDING_APPROVAL";

// export type encounterType =
//     | "OPD"
//     | "IPD"
//     | "EMERGENCY";
export const medicalRecordMockData: MedicalRecord[] = [
  {
    "id": "mr-001",
    "medicalRecordNumber": "MRN-20260001",
    "patientId": "patient-001",
    "firstName": "Ama",
    "lastName": "Mensah",
    "dateOfBirth": "1990-05-14",
    "gender": "Female",
    "phone": "+233241234567",
    "email": "ama.mensah@example.com",
    "diagnosis": "Essential Hypertension",
    "provider": {
      "id": "prov-001",
      "name": "Dr. Kwame Asare",
      "specialty": "Cardiology"
    },
    "chiefComplaint": "Persistent headaches and elevated blood pressure",
    "primaryDiagnosis": "Essential Hypertension",
    "secondaryDiagnoses": [
      "Hyperlipidemia"
    ],
    "attendingDoctor": "Dr. Kwame Asare",
    "department": "Cardiology",
    "encounterType": "OPD",
    "visitDate": "2026-07-15",
    "status": "ACTIVE",
    "createdAt": "2026-07-15T09:30:00Z",
    "updatedAt": "2026-07-15T10:15:00Z"
  },
  {
    "id": "mr-002",
    "medicalRecordNumber": "MRN-20260002",
    "patientId": "patient-002",
    "firstName": "Kofi",
    "lastName": "Owusu",
    "dateOfBirth": "1985-11-22",
    "gender": "Male",
    "phone": "+233202345678",
    "email": "kofi.owusu@example.com",
    "diagnosis": "Type 2 Diabetes Mellitus",
    "provider": {
      "id": "prov-002",
      "name": "Dr. Esi Boateng",
      "specialty": "Endocrinology"
    },
    "chiefComplaint": "Increased thirst and frequent urination",
    "primaryDiagnosis": "Type 2 Diabetes Mellitus",
    "secondaryDiagnoses": [
      "Obesity"
    ],
    "attendingDoctor": "Dr. Esi Boateng",
    "department": "Endocrinology",
    "encounterType": "OPD",
    "visitDate": "2026-07-18",
    "status": "ACTIVE",
    "createdAt": "2026-07-18T11:00:00Z",
    "updatedAt": "2026-07-18T12:20:00Z"
  },
  {
    "id": "mr-003",
    "medicalRecordNumber": "MRN-20260003",
    "patientId": "patient-003",
    "firstName": "Yaw",
    "lastName": "Adjei",
    "dateOfBirth": "1978-03-09",
    "gender": "Male",
    "phone": "+233244567890",
    "email": "yaw.adjei@example.com",
    "diagnosis": "Community Acquired Pneumonia",
    "provider": {
      "id": "prov-003",
      "name": "Dr. Michael Osei",
      "specialty": "Pulmonology"
    },
    "chiefComplaint": "Cough, fever, and difficulty breathing",
    "primaryDiagnosis": "Community Acquired Pneumonia",
    "secondaryDiagnoses": [
      "Fever"
    ],
    "attendingDoctor": "Dr. Michael Osei",
    "department": "Pulmonology",
    "encounterType": "EMERGENCY",
    "visitDate": "2026-07-20",
    "status": "DISCHARGED",
    "createdAt": "2026-07-20T14:10:00Z",
    "updatedAt": "2026-07-22T08:00:00Z"
  },
  {
    "id": "mr-004",
    "medicalRecordNumber": "MRN-20260004",
    "patientId": "patient-004",
    "firstName": "Akosua",
    "lastName": "Amoah",
    "dateOfBirth": "1995-08-30",
    "gender": "Female",
    "phone": "+233551234890",
    "email": "akosua.amoah@example.com",
    "diagnosis": "Migraine",
    "provider": {
      "id": "prov-004",
      "name": "Dr. Linda Nyarko",
      "specialty": "Neurology"
    },
    "chiefComplaint": "Recurring severe headaches with nausea",
    "primaryDiagnosis": "Migraine without aura",
    "secondaryDiagnoses": [
      "Photophobia"
    ],
    "attendingDoctor": "Dr. Linda Nyarko",
    "department": "Neurology",
    "encounterType": "OPD",
    "visitDate": "2026-07-21",
    "status": "ACTIVE",
    "createdAt": "2026-07-21T10:00:00Z",
    "updatedAt": "2026-07-21T10:45:00Z"
  },
  {
    "id": "mr-005",
    "medicalRecordNumber": "MRN-20260005",
    "patientId": "patient-005",
    "firstName": "Nana",
    "lastName": "Addo",
    "dateOfBirth": "1968-12-17",
    "gender": "Male",
    "phone": "+233267890123",
    "email": "nana.addo@example.com",
    "diagnosis": "Osteoarthritis of Knee",
    "provider": {
      "id": "prov-005",
      "name": "Dr. Samuel Tetteh",
      "specialty": "Orthopedics"
    },
    "chiefComplaint": "Chronic knee pain and reduced mobility",
    "primaryDiagnosis": "Osteoarthritis of Knee",
    "secondaryDiagnoses": [
      "Joint stiffness"
    ],
    "attendingDoctor": "Dr. Samuel Tetteh",
    "department": "Orthopedics",
    "encounterType": "OPD",
    "visitDate": "2026-07-23",
    "status": "ACTIVE",
    "createdAt": "2026-07-23T13:00:00Z",
    "updatedAt": "2026-07-23T13:40:00Z"
  },
  {
    "id": "mr-006",
    "medicalRecordNumber": "MRN-20260006",
    "patientId": "patient-006",
    "firstName": "Efua",
    "lastName": "Asante",
    "dateOfBirth": "2001-04-25",
    "gender": "Female",
    "phone": "+233245678901",
    "email": "efua.asante@example.com",
    "diagnosis": "Acute Gastritis",
    "provider": {
      "id": "prov-006",
      "name": "Dr. Richard Amoako",
      "specialty": "Gastroenterology"
    },
    "chiefComplaint": "Abdominal pain and nausea after meals",
    "primaryDiagnosis": "Acute Gastritis",
    "secondaryDiagnoses": [
      "Acid reflux"
    ],
    "attendingDoctor": "Dr. Richard Amoako",
    "department": "Gastroenterology",
    "encounterType": "OPD",
    "visitDate": "2026-07-24",
    "status": "ACTIVE",
    "createdAt": "2026-07-24T09:15:00Z",
    "updatedAt": "2026-07-24T10:00:00Z"
  },
  {
    "id": "mr-007",
    "medicalRecordNumber": "MRN-20260007",
    "patientId": "patient-007",
    "firstName": "Kojo",
    "lastName": "Frimpong",
    "dateOfBirth": "1992-06-05",
    "gender": "Male",
    "phone": "+233208765432",
    "email": "kojo.frimpong@example.com",
    "diagnosis": "Urinary Tract Infection",
    "provider": {
      "id": "prov-007",
      "name": "Dr. Patricia Quaye",
      "specialty": "Urology"
    },
    "chiefComplaint": "Painful urination and lower abdominal discomfort",
    "primaryDiagnosis": "Urinary Tract Infection",
    "secondaryDiagnoses": [
      "Dysuria"
    ],
    "attendingDoctor": "Dr. Patricia Quaye",
    "department": "Urology",
    "encounterType": "OPD",
    "visitDate": "2026-07-25",
    "status": "ACTIVE",
    "createdAt": "2026-07-25T15:20:00Z",
    "updatedAt": "2026-07-25T16:00:00Z"
  },
  {
    "id": "mr-008",
    "medicalRecordNumber": "MRN-20260008",
    "patientId": "patient-008",
    "firstName": "Adwoa",
    "lastName": "Darko",
    "dateOfBirth": "1988-09-12",
    "gender": "Female",
    "phone": "+233503456789",
    "email": "adwoa.darko@example.com",
    "diagnosis": "Asthma",
    "provider": {
      "id": "prov-008",
      "name": "Dr. Felix Badu",
      "specialty": "Respiratory Medicine"
    },
    "chiefComplaint": "Wheezing and shortness of breath",
    "primaryDiagnosis": "Bronchial Asthma",
    "secondaryDiagnoses": [
      "Seasonal allergies"
    ],
    "attendingDoctor": "Dr. Felix Badu",
    "department": "Respiratory Medicine",
    "encounterType": "EMERGENCY",
    "visitDate": "2026-07-26",
    "status": "DISCHARGED",
    "createdAt": "2026-07-26T18:00:00Z",
    "updatedAt": "2026-07-27T09:30:00Z"
  },
  {
    "id": "mr-009",
    "medicalRecordNumber": "MRN-20260009",
    "patientId": "patient-009",
    "firstName": "Kwesi",
    "lastName": "Agyeman",
    "dateOfBirth": "1959-01-28",
    "gender": "Male",
    "phone": "+233547890123",
    "email": "kwesi.agyeman@example.com",
    "diagnosis": "Coronary Artery Disease",
    "provider": {
      "id": "prov-009",
      "name": "Dr. Joseph Appiah",
      "specialty": "Cardiology"
    },
    "chiefComplaint": "Chest pain and shortness of breath during activity",
    "primaryDiagnosis": "Coronary Artery Disease",
    "secondaryDiagnoses": [
      "Hypertension",
      "High cholesterol"
    ],
    "attendingDoctor": "Dr. Joseph Appiah",
    "department": "Cardiology",
    "encounterType": "IPD",
    "visitDate": "2026-07-28",
    "status": "ACTIVE",
    "createdAt": "2026-07-28T07:45:00Z",
    "updatedAt": "2026-07-28T09:00:00Z"
  },
  {
    "id": "mr-010",
    "medicalRecordNumber": "MRN-20260010",
    "patientId": "patient-010",
    "firstName": "Abena",
    "lastName": "Sarpong",
    "dateOfBirth": "2010-10-19",
    "gender": "Female",
    "phone": "+233556789012",
    "email": "abena.sarpong@example.com",
    "diagnosis": "Acute Tonsillitis",
    "provider": {
      "id": "prov-010",
      "name": "Dr. Grace Mensima",
      "specialty": "Pediatrics"
    },
    "chiefComplaint": "Sore throat and difficulty swallowing",
    "primaryDiagnosis": "Acute Tonsillitis",
    "secondaryDiagnoses": [
      "Fever"
    ],
    "attendingDoctor": "Dr. Grace Mensima",
    "department": "Pediatrics",
    "encounterType": "OPD",
    "visitDate": "2026-07-30",
    "status": "COMPLETED",
    "createdAt": "2026-07-30T12:30:00Z",
    "updatedAt": "2026-07-30T13:15:00Z"
  }
]
