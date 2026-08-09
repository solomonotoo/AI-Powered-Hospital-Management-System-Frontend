import z from "zod";
import {
  optionalString,
  requiredEmail,
  requiredPhone,
  requiredString,
} from "./validators";
import { facilityType, facilityStatus } from "./enums";

const locationSchema = z.object({
  line1: requiredString("Address Line 1", 150),
  line2: optionalString(50),
  city: requiredString("City", 80),
  state: requiredString("State / region", 80),
  country: requiredString("Country", 80),
  postalCode: optionalString(20),
});

export const facilitySchema = z.object({
  code: requiredString("Facility code is required", 10),
  name: requiredString("Facility name is required", 20),
  type: facilityType, // MUST be one of the enum values
  location: locationSchema,
  contactPhone: requiredPhone("Contact phone"),
  contactEmail: requiredEmail,
  status: facilityStatus, // MUST be one of the enum values
});

/**
 * Values coming INTO React Hook Form.
 */
export type FacilityFormInput = z.input<typeof facilitySchema>;

/**
 * Values AFTER Zod validation/transformation.
 */
export type FacilityFormValues = z.output<typeof facilitySchema>;
