import { useEffect } from "react";
import { FieldGroup } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { StaffFormStepProps } from "@/features/staff/types/staff";
import { useFacilities } from "@/features/facility/hook/use-facilities";
import { getCurrentFacilityId } from "@/lib/auth";

export const EmploymentAndAssignmentStep = ({ form }: StaffFormStepProps) => {
  const { control, setValue, watch } = form;
  const currentFacilityVal = watch("facilityId");

  const { data: facilitiesData } = useFacilities({ page: 0, size: 50 });
  const facilityOptions = facilitiesData?.content.map((f) => ({
    label: `${f.name} (${f.code})`,
    value: f.facilityId,
  })) ?? [];

  useEffect(() => {
    if (!currentFacilityVal) {
      const activeFacId = getCurrentFacilityId();
      if (activeFacId) {
        setValue("facilityId", activeFacId);
      } else if (facilityOptions.length > 0) {
        setValue("facilityId", facilityOptions[0].value);
      }
    }
  }, [currentFacilityVal, facilityOptions, setValue]);

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
    { label: "Super Admin", value: "SUPER_ADMIN" },
  ];

  return (
    <FieldGroup>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AppFormField
          control={control}
          name="facilityId"
          label="Facility"
          type="select"
          options={facilityOptions.length > 0 ? facilityOptions : [
            { label: "Current Facility", value: currentFacilityVal || getCurrentFacilityId() || "" }
          ]}
          description="SaaS tenant facility assignment"
        />
        <AppFormField
          control={control}
          name="role"
          label="Role"
          type="select"
          options={roleOptions}
          description="Staff current role"
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
