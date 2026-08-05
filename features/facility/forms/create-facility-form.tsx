import { UseFormReturn, useForm } from "react-hook-form";
import { Facility } from "../types";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { FacilityFormValues, facilitySchema } from "../schema/facility-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { facilityFormDefaultValues } from "../schema/facility-default-values";
import { forwardRef, useImperativeHandle } from "react";

interface CreateFacilityFormProps {
  onSubmit: (values: FacilityFormValues) => void | Promise<void>;
  defaultValues?: Partial<FacilityFormValues>;
}

//NB use forwardRef to expose the form's submit function
export const CreateFacilityForm = forwardRef<
  { submit: () => void }, //what we expose to parent
  CreateFacilityFormProps
>(({ onSubmit, defaultValues }, ref) => {
  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      ...facilityFormDefaultValues,
      ...defaultValues,
    },
    mode: "onTouched",
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  //Expose the submit function to parent
  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  const facilityTypeOptions = [
    { label: "Teaching Hospital", value: "TEACHING_HOSPITAL" },
    { label: "Region Hospital", value: "REGIONAL_HOSPITAL" },
    { label: "District Hospital", value: "DISTRICT_HOSPITAL" },
    { label: "Polyclinic", value: "POLYCLINIC" },
    { label: "Health Centre", value: "HEALTH_CENTRE" },
    { label: "Chips", value: "CHIPS" },
    { label: "Specialist Hospital", value: "SPECIALIST_HOSPITAL" },
  ];

  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Pending Approval", value: "PENDING_APPROVAL" },
  ];

  return (
    <form>
      <FieldGroup className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <AppFormField
          control={form.control}
          name="code"
          label="Facility Code"
          required
          autoComplete="off"
        />
        <AppFormField
          control={form.control}
          name="name"
          label="Facility Name"
          required
          autoComplete="organization"
        />
        <AppFormField
          control={form.control}
          name="type"
          label="Facility Type"
          type="select"
          options={facilityTypeOptions}
          required
          placeholder="Select facility type"
        />
        <AppFormField
          control={form.control}
          name="status"
          label="Select  Status"
          type="select"
          options={statusOptions}
          required
          placeholder="Select status"
        />
        <AppFormField
          control={form.control}
          name="location.line1"
          label="Line 1"
          required
        />
        <AppFormField
          control={form.control}
          name="location.line2"
          label="Line 2"
        />
        <AppFormField
          control={form.control}
          name="location.city"
          label="City"
        />
        <AppFormField
          control={form.control}
          name="location.state"
          label="State/Region"
        />
        <AppFormField
          control={form.control}
          name="location.country"
          label="Country"
          required
        />

        <AppFormField
          control={form.control}
          name="location.postalCode"
          label="Postalcode"
        />
        <AppFormField
          control={form.control}
          name="contactEmail"
          label="Email"
          required
          placeholder="johndoe@abc.com"
        />
        <AppFormField
          control={form.control}
          name="contactPhone"
          label="Phone"
          required
          placeholder="+23390338277"
        />
      </FieldGroup>
    </form>
  );
});

CreateFacilityForm.displayName = "CreateFacilityForm";
