import { FacilityFormValues } from "./facility-schema";

export const facilityFormDefaultValues: Partial<FacilityFormValues> = {
  code: "",
  name: "",
  type: "",
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
  status: "",
};
