import { MedicalRecord } from "./types/medical-records";

// export type MedicalRecordStatus = 
// | "ACTIVE"
// | "ARCHIVED"
// | "PENDING";
 
// export type encounterType =
//     | "OPD"
//     | "IPD"
//     | "EMERGENCY";
export const medicalRecordMockData: MedicalRecord[] = [
    {
      "patientId": "P100001",
      "medicalRecordNumber": "MRN100001",
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1985-04-12",
      "gender": "Male",
      "phone": "+1-555-123-4567",
      "email": "john.doe@example.com",
      "department": "Cardiology",
      "encounterType": "OPD",
      "status": "ACTIVE",
      "visitDate": "2026-07-20T09:30:00Z",
      "provider": {
        "id": "DR101",
        "name": "Dr. Sarah Mitchell",
        "specialty": "Cardiology"
      },
      "chiefComplaint": "Chest pain during exercise",
      "diagnosis": "Essential Hypertension",
      "primaryDiagnosis": "Essential Hypertension",
      "secondaryDiagnoses": ["Hyperlipidemia"],
      "icd10Code": "I10",
      "vitals": {
        "bloodPressure": "145/92",
        "heartRate": 82,
        "respiratoryRate": 18,
        "temperature": 36.8,
        "oxygenSaturation": 98,
        "heightCm": 178,
        "weightKg": 84,
        "bmi": 26.5
      },
      "allergies": ["Penicillin"],
      "medications": [
        {
          "name": "Lisinopril",
          "dosage": "10 mg",
          "frequency": "Once daily"
        },
        {
          "name": "Atorvastatin",
          "dosage": "20 mg",
          "frequency": "Once daily"
        }
      ],
      "medicalHistory": ["Hypertension", "High Cholesterol"],
      "familyHistory": ["Father - Heart Disease"],
      "labResults": [
        {
          "test": "Total Cholesterol",
          "result": "220 mg/dL",
          "status": "High"
        }
      ],
      "procedures": [],
      "treatmentPlan": "Continue medication, low-sodium diet, regular exercise.",
      "followUpDate": "2026-08-20",
      "notes": "Blood pressure improving with treatment."
    },
    {
      "patientId": "P100002",
      "medicalRecordNumber": "MRN100002",
      "firstName": "Emma",
      "lastName": "Johnson",
      "dateOfBirth": "1993-09-18",
      "gender": "Female",
      "phone": "+1-555-987-6543",
      "email": "emma.johnson@example.com",
      "department": "Emergency",
      "encounterType": "Emergency",
      "status": "Admitted",
      "visitDate": "2026-07-23T14:45:00Z",
      "provider": {
        "id": "DR205",
        "name": "Dr. Michael Brown",
        "specialty": "Emergency Medicine"
      },
      "chiefComplaint": "Severe abdominal pain",
      "diagnosis": "Acute Appendicitis",
      "primaryDiagnosis": "Acute Appendicitis",
      "secondaryDiagnoses": [],
      "icd10Code": "K35.80",
      "vitals": {
        "bloodPressure": "122/80",
        "heartRate": 105,
        "respiratoryRate": 20,
        "temperature": 38.4,
        "oxygenSaturation": 99,
        "heightCm": 165,
        "weightKg": 61,
        "bmi": 22.4
      },
      "allergies": [],
      "medications": [],
      "medicalHistory": [],
      "familyHistory": [],
      "labResults": [
        {
          "test": "White Blood Cell Count",
          "result": "15.8 x10^9/L",
          "status": "High"
        }
      ],
      "procedures": ["Appendectomy Scheduled"],
      "treatmentPlan": "Prepare for surgery and administer IV antibiotics.",
      "followUpDate": null,
      "notes": "Patient admitted for emergency surgery."
    },
    {
      "patientId": "P100003",
      "medicalRecordNumber": "MRN100003",
      "firstName": "David",
      "lastName": "Wilson",
      "dateOfBirth": "1976-11-03",
      "gender": "Male",
      "phone": "+1-555-345-6789",
      "email": "david.wilson@example.com",
      "department": "Orthopedics",
      "encounterType": "Follow-up",
      "status": "Completed",
      "visitDate": "2026-07-22T11:00:00Z",
      "provider": {
        "id": "DR302",
        "name": "Dr. Lisa Carter",
        "specialty": "Orthopedic Surgery"
      },
      "chiefComplaint": "Persistent knee pain",
      "diagnosis": "Osteoarthritis of the Knee",
      "primaryDiagnosis": "Osteoarthritis",
      "secondaryDiagnoses": [],
      "icd10Code": "M17.9",
      "vitals": {
        "bloodPressure": "130/84",
        "heartRate": 76,
        "respiratoryRate": 16,
        "temperature": 36.6,
        "oxygenSaturation": 98,
        "heightCm": 180,
        "weightKg": 92,
        "bmi": 28.4
      },
      "allergies": ["Ibuprofen"],
      "medications": [
        {
          "name": "Acetaminophen",
          "dosage": "500 mg",
          "frequency": "Every 6 hours as needed"
        }
      ],
      "medicalHistory": ["Osteoarthritis"],
      "familyHistory": ["Mother - Arthritis"],
      "labResults": [],
      "procedures": ["Knee X-ray"],
      "treatmentPlan": "Physical therapy and weight management.",
      "followUpDate": "2026-09-01",
      "notes": "Recommend low-impact exercise."
    },
    {
      "patientId": "P100004",
      "medicalRecordNumber": "MRN100004",
      "firstName": "Sophia",
      "lastName": "Taylor",
      "dateOfBirth": "2000-02-27",
      "gender": "Female",
      "phone": "+1-555-555-1122",
      "email": "sophia.taylor@example.com",
      "department": "Dermatology",
      "encounterType": "Outpatient",
      "status": "Completed",
      "visitDate": "2026-07-21T10:15:00Z",
      "provider": {
        "id": "DR404",
        "name": "Dr. Kevin Lee",
        "specialty": "Dermatology"
      },
      "chiefComplaint": "Itchy skin rash",
      "diagnosis": "Atopic Dermatitis",
      "primaryDiagnosis": "Eczema",
      "secondaryDiagnoses": [],
      "icd10Code": "L20.9",
      "vitals": {
        "bloodPressure": "118/76",
        "heartRate": 72,
        "respiratoryRate": 15,
        "temperature": 36.7,
        "oxygenSaturation": 99,
        "heightCm": 167,
        "weightKg": 58,
        "bmi": 20.8
      },
      "allergies": ["Peanuts"],
      "medications": [
        {
          "name": "Hydrocortisone Cream",
          "dosage": "1%",
          "frequency": "Twice daily"
        }
      ],
      "medicalHistory": ["Seasonal Allergies"],
      "familyHistory": ["Mother - Eczema"],
      "labResults": [],
      "procedures": [],
      "treatmentPlan": "Use topical steroid and moisturizer daily.",
      "followUpDate": "2026-08-18",
      "notes": "Avoid known allergens."
    },
    {
      "patientId": "P100005",
      "medicalRecordNumber": "MRN100005",
      "firstName": "Michael",
      "lastName": "Brown",
      "dateOfBirth": "1969-08-14",
      "gender": "Male",
      "phone": "+1-555-888-3344",
      "email": "michael.brown@example.com",
      "department": "Endocrinology",
      "encounterType": "Routine Follow-up",
      "status": "Completed",
      "visitDate": "2026-07-19T08:45:00Z",
      "provider": {
        "id": "DR510",
        "name": "Dr. Rachel Green",
        "specialty": "Endocrinology"
      },
      "chiefComplaint": "Routine diabetes review",
      "diagnosis": "Type 2 Diabetes Mellitus",
      "primaryDiagnosis": "Type 2 Diabetes Mellitus",
      "secondaryDiagnoses": ["Obesity"],
      "icd10Code": "E11.9",
      "vitals": {
        "bloodPressure": "138/86",
        "heartRate": 80,
        "respiratoryRate": 16,
        "temperature": 36.5,
        "oxygenSaturation": 98,
        "heightCm": 172,
        "weightKg": 95,
        "bmi": 32.1
      },
      "allergies": ["Sulfa Drugs"],
      "medications": [
        {
          "name": "Metformin",
          "dosage": "500 mg",
          "frequency": "Twice daily"
        }
      ],
      "medicalHistory": ["Type 2 Diabetes", "Obesity"],
      "familyHistory": ["Father - Type 2 Diabetes"],
      "labResults": [
        {
          "test": "HbA1c",
          "result": "7.3%",
          "status": "Above Target"
        },
        {
          "test": "Fasting Blood Glucose",
          "result": "142 mg/dL",
          "status": "High"
        }
      ],
      "procedures": [],
      "treatmentPlan": "Continue Metformin, improve diet, increase physical activity.",
      "followUpDate": "2026-10-19",
      "notes": "Discussed lifestyle modifications and glucose monitoring."
    }
  ]
  