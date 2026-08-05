
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { PatientStepProps } from "../types";

export const InsuranceStep = ({ form }: PatientStepProps) => {
  const { control } = form;
  return (
    <FieldGroup>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AppFormField
          control={control}
          name="insurance.provider"
          label="Insurance provider"
        // className="sm:col-span-2"
        />
        <AppFormField
          control={control}
          name="insurance.policyNumber"
          label="Policy / member number"
        />
        <AppFormField
          control={control}
          name="insurance.groupNumber"
          label="Group number"
        />
        <AppFormField
          control={control}
          name="insurance.expiryDate"
          label="Policy expiry date"
          minDate={new Date()}
          endMonth={new Date(2050, 1)}
          type="date"
        />
        <AppFormField
          control={control}
          name="insurance.patientType"
          label="Patient type"
          type="select"
          required
          options={[
            { label: "OPD", value: "OPD" },
            { label: "IPD", value: "IPD" },
            { label: "Emergency", value: "EMERGENCY" },
            { label: "Day case", value: "DAYCASE" },
          ]}
        />
      </div>
    </FieldGroup>
  );
};