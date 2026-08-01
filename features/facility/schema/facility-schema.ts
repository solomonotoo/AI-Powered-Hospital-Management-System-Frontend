import z from "zod";
import { optionalString, requiredString } from "./validators";
import { facilityType, status } from "./enums";

export const facilitySchema = z.object({
  code: requiredString("Facility code is required", 10),
  name: requiredString("Facility name is required"),
  type: z
    .union([z.enum(facilityType.options), z.literal("")])
    .refine((v) => v !== "", {
      message: "Select facility type",
    }),
  location: z.object({
    line1: requiredString("Address line 1", 150),
    line2: optionalString(50),
    city: requiredString("City", 80),
    state: requiredString("State / region", 80),
    country: requiredString("Country", 80),
    postalCode: optionalString(20),
  }),
  contactPhone: optionalString(10),
  contactEmail: optionalString(45),
  status: z
    .union([z.enum(status.options), z.literal("")])
    .refine((v) => v !== "", {
      message: "Select Status",
    }),
});

export type FacilityFormValues = z.infer<typeof facilitySchema>;
