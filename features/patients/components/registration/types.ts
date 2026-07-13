import { UseFormReturn } from "react-hook-form";
import { PatientFormValues } from "../../schemas/patient-schema";

export interface PatientStepProps {
  form: UseFormReturn<PatientFormValues>;
}
