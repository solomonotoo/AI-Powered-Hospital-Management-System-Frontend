import { patientTypeEnum } from "../schemas/enums";


export type PatientTypeValue = (typeof patientTypeEnum.options)[number];

export const PATIENT_TYPE_OPTIONS: { value: PatientTypeValue; label: string; description: string }[] = [
  { value: "OPD", label: "Outpatient", description: "Consultation without admission" },
  { value: "IPD", label: "Inpatient", description: "Admitted for ongoing care" },
  { value: "EMERGENCY", label: "Emergency", description: "Urgent/unscheduled care" },
  { value: "DAYCASE", label: "Day case", description: "Admitted and discharged same day" },
];