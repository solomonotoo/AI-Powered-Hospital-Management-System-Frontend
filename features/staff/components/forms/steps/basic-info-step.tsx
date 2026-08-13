import { FieldGroup } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { StaffFormStepProps } from "@/features/staff/types/staff";

export const BasicInfoStep = ({ form }: StaffFormStepProps) => {
  const { control } = form;
  return (
    <FieldGroup className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AppFormField
          control={control}
          name="employmentNumber"
          label="Employee number"
          required
          description="Staff employment number"
        />
        <AppFormField
          control={control}
          name="firstName"
          label="First name"
          required
          description="given-name"
        />
        <AppFormField
          control={control}
          name="lastName"
          label="Last name"
          required
          description="family-name"
        />
        <AppFormField
          control={control}
          name="workEmail"
          label="Work email"
          required
          description="staff official work email"
        />
        <AppFormField
          control={control}
          name="phoneNumber"
          label="Phone"
          description="staff contact phone number"
        />
      </div>
    </FieldGroup>
  );
};
