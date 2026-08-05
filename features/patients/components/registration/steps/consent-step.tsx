import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { PatientFormValues } from "../../../schemas/patient-schema";
import { UseFormReturn, useWatch } from "react-hook-form";

export const ConsentStep = ({
  form,
}: {
  form: UseFormReturn<PatientFormValues>;
}) => {
  const { control, getValues } = form;
  const v = useWatch({ control });
  const summary = [
    ["Patient", [v.firstName, v.lastName].filter(Boolean).join(" ")],
    ["Date of birth", v.dateOfBirth],
    ["Gender", v.gender],
    ["Phone", v.phone],
    ["Email", v.email],
    ["Address", [v.address?.line1, v.address?.city, v.address?.state, v.address?.postalCode, v.address?.country].filter(Boolean).join(", ")],
    ["Next of kin", v.nextOfKin?.name],
    ["Patient type", v.insurance?.patientType],
    ["Insurance", v.insurance?.provider],
  ].filter(([, val]) => val) as [string, string][];

  return (
    <FieldGroup>
      <div className="p-4 text-sm">
        <p className="mb-3 font-medium">Review</p>
        <div className="space-y-1.5 text-muted-foreground">
          {summary.map(([key, val]) => (
            <div key={key} className="flex justify-between gap-4">
              <span>{key}</span>
              <span className="font-medium text-foreground">{val}</span>
            </div>
          ))}
        </div>
      </div>
      <FieldSeparator>Consent</FieldSeparator>
      <AppFormField
        control={control}
        name="consentToTreat"
        label="Consent to treat"
        type="checkbox"
        required
        description="Patient or guardian has signed consent to treat on file"
      />
      <AppFormField
        control={control}
        name="consentToShareData"
        label="Consent to share data"
        type="checkbox"
        description="Patient consents to data sharing for care coordination (GDPR / HIPAA)"
      />
    </FieldGroup>
  );
};
