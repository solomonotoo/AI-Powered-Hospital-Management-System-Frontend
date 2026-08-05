import z from "zod";
import { optionalString, requiredString } from "./validators";
import { facilityType, facilityStatus } from "./enums";

export const facilitySchema = z.object({
  code: requiredString("Facility code is required", 10),
  name: requiredString("Facility name is required"),
  type: z.preprocess(
    (v) => (v === "" ? undefined : v),
    facilityType
  ),
  location: z.object({
    line1: requiredString("Address line 1", 150),
    line2: optionalString(50),
    city: requiredString("City", 80),
    state: requiredString("State / region", 80),
    country: requiredString("Country", 80),
    postalCode: optionalString(20),
  }),
  contactPhone: requiredString("Phone is required", 10),
  contactEmail: requiredString("Email is required", 45),
  status: z.preprocess(
    (v) => (v === "" ? undefined : v),
    facilityStatus
  ),
});

export type FacilityFormValues = z.input<typeof facilitySchema>;
