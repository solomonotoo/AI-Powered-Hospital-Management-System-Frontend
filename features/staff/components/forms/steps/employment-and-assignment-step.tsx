import { FieldGroup } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { StaffFormStepProps } from "@/features/staff/types/staff";

export const EmploymentAndAssignmentStep = ({ form }: StaffFormStepProps) => {
  const { control } = form;

  const departmentOptions = [
    { label: "Radiology", value: "RADIOLOGY" },
    { label: "Cardiology", value: "CARDIOLOGY" },
    { label: "Oncology", value: "ONCOLOGY" },
    { label: "Neurology", value: "NEUROLOGY" },
    { label: "Orthopedics", value: "ORTHOPEDICS" },
    { label: "Pediatrics", value: "PEDIATRICS" },
    { label: "Dermatology", value: "DERMATOLOGY" },
    { label: "Ophthalmology", value: "OPHTHALMOLOGY" },
    { label: "Otolaryngology", value: "OTOLARYNGOLOGY" },
    { label: "Urology", value: "UROLOGY" },
    { label: "Surgery", value: "SURGERY" },
    { label: "Emergency", value: "EMERGENCY" },
    { label: "Pharmacy", value: "PHARMACY" },
    { label: "Outpatient (OPD)", value: "OPD" },
  ];

  const roleOptions = [
    { label: "Admin", value: "ADMIN" },
    { label: "Doctor", value: "DOCTOR" },
    { label: "Nurse", value: "NURSE" },
    { label: "Pharmacist", value: "PHARMACIST" },
    { label: "Technician", value: "LAB_TECH" },
    { label: "Administrative", value: "ADMINSTRATIVE" },
    { label: "Billing Staff", value: "BILLING_STAFF" },
    { label: "Receptionist", value: "RECEPTIONIST" },
    { label: "Ward Manager", value: "WARD_MANAGER" },
    { label: "Radiologist", value: "RADIOLOGIST" },
    { label: "Information Technology", value: "INFORMATION_TECHNOLOGY" },
  ];

  return (
    <FieldGroup>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AppFormField
          control={control}
          name="role"
          label="Profession"
          type="select"
          options={roleOptions}
          description="Staff current profession"
        />
        <AppFormField
          control={control}
          name="department"
          label="Department"
          type="select"
          options={departmentOptions}
          description="Staff assigned department"
        />
        <AppFormField
          control={control}
          name="employmentDate"
          label="Joining date"
          type="date"
          endMonth={new Date()}
          description="Date of employment"
        />
        <AppFormField
          control={control}
          name="workingHours"
          label="Work hours"
          type="time"
          description="official work hours"
        />
      </div>
    </FieldGroup>
  );
};
