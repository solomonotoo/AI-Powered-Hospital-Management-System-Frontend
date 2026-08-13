import { z } from "zod";
import {
  bigDecimal,
  isoDateString,
  isoTime,
  optionalPhone,
  optionalString,
  requiredEmail,
  requiredPhone,
  requiredString,
} from "./validator";
import { departmentEnum, roleEnum } from "./enums";

export const basicInformationSchema = z.object({
  employmentNumber: requiredString("Employment Number"),
  firstName: requiredString("First name"),
  lastName: requiredString("Last name"),
  workEmail: requiredEmail,
  phoneNumber: optionalPhone(),
});

export const employmentAndAssignmentSchema = z.object({
  role: roleEnum,
  department: departmentEnum,
  employmentDate: isoDateString,
  workingHours: isoTime,
});

export const professionalInformationSchema = z.object({
  specialisation: optionalString(50),
  licenseNumber: optionalString(20),
  qualifications: optionalString(50),
  consultationFee: bigDecimal,
});

// ---------------------------------------------------------------------------
// Combined schema — the full submit payload
// ---------------------------------------------------------------------------
export const staffSchema = z.object({
  ...basicInformationSchema.shape,
  ...employmentAndAssignmentSchema.shape,
  ...professionalInformationSchema.shape,
});

export type StaffFormInput = z.input<typeof staffSchema>;
export type StaffFormValues = z.output<typeof staffSchema>;
