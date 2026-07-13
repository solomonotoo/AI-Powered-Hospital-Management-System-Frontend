import { FieldGroup } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { PatientStepProps } from "../types";

export const PersonalInfoStep = ({ form }: PatientStepProps) => {
  const { control } = form;
  return (
    <FieldGroup className="space-y">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AppFormField
          control={control}
          name="firstName"
          label="First name"
          required
          autoComplete="given-name"
        />
        <AppFormField
          control={control}
          name="lastName"
          label="Last name"
          required
          autoComplete="family-name"
        />
        <AppFormField
          control={control}
          name="preferredName"
          label="Preferred name"
          description="What the patient likes to be called"
        />
        <AppFormField
          control={control}
          name="dateOfBirth"
          label="Date of birth"
          maxDate={new Date()}
          startMonth={new Date(1900, 0)}
          endMonth={new Date()}
          type="date"
        />

        <AppFormField
          control={control}
          name="gender"
          label="Gender"
          type="select"
          required
          options={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Other", value: "OTHER" },
            { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
          ]}
        />
        <AppFormField
          control={control}
          name="nationalId"
          label="National ID/ Passport"
        />
        <AppFormField
          control={control}
          name="bloodGroup"
          label="Blood Group"
          type="select"
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
            (v) => ({ label: v, value: v })
          )}
        />
        <AppFormField
          control={control}
          name="maritalStatus"
          label="Marital status"
          type="select"
          options={[
            { label: "Single", value: "SINGLE" },
            { label: "Married", value: "MARRIED" },
            { label: "Divorced", value: "DIVORCED" },
            { label: "Widowed", value: "WIDOWED" },
          ]}
        />
        <AppFormField
          control={control}
          name="nationality"
          label="Nationality"
          required
        />
        <AppFormField
          control={control}
          name="religion"
          label="Religion"
          description="Relevant for dietary / care preferences"
        />
        <AppFormField
          control={control}
          name="ethnicity"
          label="Ethnicity"
          description="For population health analytics"
        />
        <AppFormField control={control} name="occupation" label="Occupation" />
        <AppFormField
          control={control}
          name="preferredLanguage"
          label="Preferred language"
          description="For translated communications"
        />
      </div>
    </FieldGroup>
  );
};
