import { FacilityFormInput, FacilityFormValues } from "./facility-schema";


// facility-default-values.ts should ideally use the input type because these values
// are being passed into React Hook Form.
export const facilityFormDefaultValues: Partial<FacilityFormInput> = {
  code: "",
  name: "",
  type: "DISTRICT_HOSPITAL",
  location: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  contactPhone: "",
  contactEmail: "",
  status: "ACTIVE",
};
