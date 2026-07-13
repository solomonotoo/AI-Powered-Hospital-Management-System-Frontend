
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { PatientStepProps } from "../types";

export const NextOfKinStep = ({ form }: PatientStepProps) => {
    const { control } = form;
    return (
      <FieldGroup>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AppFormField
            control={control}
            name="nextOfKinName"
            label="Full name"
            required
            // className="sm:col-span-2"
          />
          <AppFormField
            control={control}
            name="nextOfKinRelationship"
            label="Relationship to patient"
            type="select"
            required
            options={
              [ { value: "SPOUSE", label: "Spouse" },
              { value: "PARENT", label: "Parent" },
              { value: "CHILD", label: "Child" },
              { value: "SIBLING", label: "Sibling" },
              { value: "GUARDIAN", label: "Guardian" },
              { value: "RELATIVE", label: "Other relative" },
              { value: "FRIEND", label: "Friend" },
              { value: "OTHER", label: "Other (please specify)" }]
            }
          />
          <AppFormField
            control={control}
            name="nextOfKinPhone"
            label="Phone number"
            type="tel"
            required
          />
          <AppFormField
            control={control}
            name="nextOfKinEmail"
            label="Email"
            type="email"
            // className="sm:col-span-2"
          />
        </div>
      </FieldGroup>
    );
  };