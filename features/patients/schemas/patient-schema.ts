import { z } from "zod";
import {
  isoDateString,
  optionalIsoDateString,
  optionalPhoneNumber,
  optionalString,
  phoneNumber,
  requiredString,
} from "./validators";
import {
  bloodGroupEnum,
  genderEnum,
  maritialStatusEnum,
  patientTypeEnum,
  relationshipEnum,
} from "./enums";

/**
 * Patient registration validation schemas.
 *
 * Split into one schema per wizard step, then merged into a single
 * `patientSchema` for the final submit payload. Keeping the schemas
 * separate lets each step validate independently (so "Next" only
 * checks the fields visible on that step) while still giving us one
 * source of truth for the full shape.
 *
 * Fields that are system-generated or server-assigned are NOT part of
 * this form: patientId, mrn, registrationDate, registeredBy, isActive,
 * createdAt, updatedAt. Those get set by the backend on creation.
 */
// ---------------------------------------------------------------------------
// Step 1 — Personal & demographic info
// ---------------------------------------------------------------------------
export const personalInfoSchema = z.object({
  firstName: requiredString("First name"),
  lastName: requiredString("Last name"),
  preferredName: optionalString(50),
  dateOfBirth: isoDateString.refine((val) => {
    const dob = new Date(val);
    return dob <= new Date();
  }, "Date of birth cannot be in the future"),
  gender: z.enum(genderEnum.options, { message: "Select a gender" }),
  maritalStatus: z.enum(maritialStatusEnum.options, {
    message: "Select marital status",
  }),
  email: z
    .union([
      z.string().trim().pipe(z.email("Enter a valid email")),
      z.literal(""),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  nationalId: optionalString(50),
  bloodGroup: bloodGroupEnum.optional(),
  religion: optionalString(50),
  ethnicity: optionalString(50),
  occupation: optionalString(100),
  nationality: requiredString("Nationality", 50),
  preferredLanguage: optionalString(50),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

// ---------------------------------------------------------------------------
// Step 2 — Contact & address
// ---------------------------------------------------------------------------

export const contactInfoSchema = z.object({
  email: z
    .union([
      z.string().trim().pipe(z.email("Enter a valid email")),
      z.literal(""),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  phone: phoneNumber,
  alternatePhone: optionalPhoneNumber,
  address: z.object({

    line1: requiredString("Address line 1", 150),
    line2: optionalString(50),
    city: requiredString("City", 80),
    state: requiredString("State / region", 80),
    country: requiredString("Country", 80),
    postalCode: optionalString(20),
  }),
});

export type ContactInfoValues = z.infer<typeof contactInfoSchema>;

// ---------------------------------------------------------------------------
// Step 3 — Next of kin / emergency contact
// ---------------------------------------------------------------------------
export const nextOfKinSchema = z.object({
  nextOfKin: z.object({
    name: requiredString("Next of kin name", 100),
    relationship: z
      .union([z.enum(relationshipEnum.options), z.literal("")])
      .refine((v) => v !== "", {
        message: "Select a relationship",
      }),
    relationshipOther: optionalString(50),
    phone: phoneNumber,
    email: z
      .union([z.email("Enter a valid email"), z.literal("")])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
  }),
});

export type NextOfKinInfoValues = z.infer<typeof nextOfKinSchema>;

// ---------------------------------------------------------------------------
// Step 4 — Insurance & registration type
// ---------------------------------------------------------------------------
export const insuraceFieldsSchema = z.object({
  insurance: z.object({
    patientType: z
      .union([z.enum(patientTypeEnum.options), z.literal("")])
      .refine((v) => v !== "", {
        message: "Select a patient type",
      }),
    provider: optionalString(100),
    policyNumber: optionalString(50),
    groupNumber: optionalString(50),
    expiryDate: optionalIsoDateString,
  }),
});

export type InsuranceValues = z.infer<typeof insuraceFieldsSchema>;

// ---------------------------------------------------------------------------
// Step 5 — Consent & review
// ---------------------------------------------------------------------------
export const consentSchema = z.object({
  consentToTreat: z.literal(true, {
    message: "Consent to treat is required to register the patient",
  }),
  consentToShareData: z.boolean(),
});

export type ConsentValues = z.infer<typeof consentSchema>;

// ---------------------------------------------------------------------------
// Combined schema — the full submit payload
// ---------------------------------------------------------------------------

export const patientSchema = z
  .object({
    ...personalInfoSchema.shape,
    ...contactInfoSchema.shape,
    ...nextOfKinSchema.shape,
    ...insuraceFieldsSchema.shape,
    ...consentSchema.shape,
  })
  // If any insurance detail is provided, require the provider name + policy
  // number too, so we never save a half-filled insurance record.
  .superRefine((data, ctx) => {
    if (
      (data.nextOfKin.relationship as any) === "OTHER" &&
      !data.nextOfKin.relationshipOther
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["relationshipOther"],
        message: "Please specify the relationship",
      });
    }
    if (
      (data.insurance.policyNumber ||
        data.insurance.groupNumber ||
        data.insurance.expiryDate) &&
      !data.insurance.provider
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["provider"],
        message:
          "Insurance provider is required when other insurance details are entered",
      });
    }
    if (data.insurance.provider && !data.insurance.policyNumber) {
      ctx.addIssue({
        code: "custom",
        path: ["policyNumber"],
        message:
          "Policy number is required when an insurance provider is entered",
      });
    }
  });

export type PatientFormValues = z.input<typeof patientSchema>;

// ---------------------------------------------------------------------------
// schema fields. helper method to get all schema fiels
// ---------------------------------------------------------------------------
function getSchemaFields<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return Object.keys(schema.shape) as (keyof z.infer<typeof schema>)[];
}
