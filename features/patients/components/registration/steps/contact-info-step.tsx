import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { PatientStepProps } from "../types";


export const ContactInfoStep = ({ form }: PatientStepProps) => {
    const { control } = form;
    return (
      <FieldGroup className="space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AppFormField
            control={control}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
          />
          <AppFormField
            control={control}
            name="phone"
            label="Phone number"
            type="tel"
            required
            autoComplete="tel"
          />
          <AppFormField
            control={control}
            name="alternatePhone"
            label="Alternate number"
            type="tel"
            autoComplete="tel"
          />
        </div>
        <FieldSeparator>Address</FieldSeparator>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AppFormField
            control={control}
            name="addressLine1"
            label="Address Line 1"
            required
            autoComplete="address-line1"
            // className="sm:cols-span-2"
          />
          <AppFormField
            control={control}
            name="addressLine2"
            label="Address Line 2"
            description="Apartment / suite / building"
            autoComplete="address-line2"
            // className="sm:cols-span-2"
          />
          <AppFormField
            control={control}
            name="city"
            label="City"
            required
            autoComplete="address-level2"
          />
          <AppFormField
            control={control}
            name="state"
            label="State / region"
            required
            autoComplete="address-level1"
          />
          <AppFormField
            control={control}
            name="country"
            label="Country"
            required
            autoComplete="country-name"
          />
          <AppFormField
            control={control}
            name="postalCode"
            label="Postal code"
            autoComplete="postal-code"
          />
        </div>
      </FieldGroup>
    );
  };