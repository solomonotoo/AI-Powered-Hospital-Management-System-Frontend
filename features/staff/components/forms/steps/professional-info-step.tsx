import { FieldGroup } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { StaffFormStepProps } from "@/features/staff/types/staff";

export const ProfessionalInfoStep = ({ form }: StaffFormStepProps) => {
  const { control } = form;

  return (
    <FieldGroup>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <AppFormField
          control={control}
          name="specialisation"
          label="Specialisation"
          description="specialise field for doctors"
        />
        <AppFormField
          control={control}
          name="licenseNumber"
          label="License number"
          description="license number for doctors and nurses"
        />
        <AppFormField
          control={control}
          name="qualifications"
          label="qualifications"
          description="education qualification"
        />
        <AppFormField
          control={control}
          name="consultationFee"
          label="Consultation Fee"
          description="Fees charged by doctors"
        />
      </div>
    </FieldGroup>
  );
};
