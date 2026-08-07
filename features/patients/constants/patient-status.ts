import { patientTypeEnum } from "../schemas/enums";


export type PatientTypeValue = (typeof patientTypeEnum.options)[number];

export const PATIENT_TYPE_OPTIONS: { value: PatientTypeValue; label: string; description: string }[] = [
  { value: "OPD", label: "OPD", description: "Consultation without admission" },
  { value: "IPD", label: "IPD", description: "Admitted for ongoing care" },
  { value: "EMERGENCY", label: "Emergency", description: "Urgent/unscheduled care" },
  { value: "DAYCASE", label: "Day case", description: "Admitted and discharged same day" },
];