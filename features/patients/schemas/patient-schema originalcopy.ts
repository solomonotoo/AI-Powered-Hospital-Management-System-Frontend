// import { z } from "zod";

// /**
//  * Patient registration validation schemas.
//  *
//  * Split into one schema per wizard step, then merged into a single
//  * `patientSchema` for the final submit payload. Keeping the schemas
//  * separate lets each step validate independently (so "Next" only
//  * checks the fields visible on that step) while still giving us one
//  * source of truth for the full shape.
//  *
//  * Fields that are system-generated or server-assigned are NOT part of
//  * this form: patientId, mrn, registrationDate, registeredBy, isActive,
//  * createdAt, updatedAt. Those get set by the backend on creation.
//  */

// // ---------------------------------------------------------------------------
// // Shared enums (mirror the backend enums exactly so payloads serialize 1:1)
// // ---------------------------------------------------------------------------
// export const genderEnum = z.enum([
//   "MALE",
//   "FEMALE",
//   "OTHER",
//   "PREFER_NOT_TO_SAY",
// ]);

// export const bloodGroupEnum = z.enum([
//   "A+",
//   "A-",
//   "B+",
//   "B-",
//   "AB+",
//   "AB-",
//   "O+",
//   "O-",
// ]);

// export const maritialStatusEnum = z.enum([
//   "SINGLE",
//   "MARRIED",
//   "DIVORCED",
//   "WIDOWED",
// ]);

// export const patientTypeEnum = z.enum(["OPD", "IPD", "EMERGENCY", "DAYCASE"]);

// export const relationshipEnum = z.enum([
//   "SPOUSE",
//   "PARENT",
//   "CHILD",
//   "SIBLING",
//   "GUARDIAN",
//   "RELATIVE",
//   "FRIEND",
//   "OTHER.",
// ]);

// // ---------------------------------------------------------------------------
// // Reusable primitive validators
// // ---------------------------------------------------------------------------

// // E.164-ish phone validator. Loose on purpose -- Ghana numbers, international
// // patients, landlines with extensions, etc. Just guards against garbage input.
// const phoneNumber = z
//   .string()
//   .trim()
//   .min(7, "Enter a valid phone number")
//   .regex(/^[+]?[\d\s-()]{7,20}$/, "Enter a valid phone number");

// const optionalPhoneNumber = z
//   .union([phoneNumber, z.literal("")])
//   .optional()
//   .transform((val) => (val === "" ? undefined : val));

// const requiredString = (label: string, max = 100) =>
//   z.string().trim().min(1, `${label} is required`).max(max);

// const optionalString = (max = 150) =>
//   z
//     .string()
//     .trim()
//     .max(max)
//     .optional()
//     .transform((val) => (val === "" ? undefined : val));

// // Dates come out of <input type="date"> as "YYYY-MM-DD" strings; we validate
// // the string here and convert to Date objects only at the very edge
// // (submit handler), so RHF's controlled inputs stay simple strings.
// const isoDateString = z
//   .string()
//   .min(1, "Date is required")
//   .refine((val) => !Number.isNaN(Date.parse(val)), "Enter a valid date");

// const optionalIsoDateString = z
//   .union([isoDateString, z.literal("")])
//   .optional()
//   .transform((val) => (val === "" ? undefined : val));

// // ---------------------------------------------------------------------------
// // Step 1 — Personal & demographic info
// // ---------------------------------------------------------------------------
// export const personalInfoSchema = z.object({
//   firstName: requiredString("First name"),
//   lastName: requiredString("Last name"),
//   preferredName: optionalString(50),
//   dateOfBirth: isoDateString.refine((val) => {
//     const dob = new Date(val);
//     return dob <= new Date();
//   }, "Date of birth cannot be in the future"),
//   gender: z.enum(genderEnum.options, { message: "Select a gender" }),
//   maritalStatus: z.enum(maritialStatusEnum.options, {
//     message: "Select marrital status",
//   }),
//   nationalId: optionalString(50),
//   bloodGroup: bloodGroupEnum.optional(),
//   religion: optionalString(50),
//   ethnicity: optionalString(50),
//   occupation: optionalString(100),
//   nationality: requiredString("Nationality", 50),
//   preferredLanguage: optionalString(50),
// });

// export type PersonalInforValues = z.infer<typeof personalInfoSchema>;

// // ---------------------------------------------------------------------------
// // Step 2 — Contact & address
// // ---------------------------------------------------------------------------

// export const contactInfoSchema = z.object({
//   email: z
//     .union([z.email("Enter a valid email"), z.literal("")])
//     .optional()
//     .transform((val) => (val === "" ? undefined : val)),
//   phone: phoneNumber,
//   alternatePhone: optionalPhoneNumber,
//   addressLine1: requiredString("Address line 1", 150),
//   addressLine2: optionalString(50),
//   city: requiredString("City", 80),
//   state: requiredString("State / region", 80),
//   country: requiredString("Country", 80),
//   postalCode: optionalString(20),
// });

// export type ContactInfoValues = z.infer<typeof contactInfoSchema>;

// // ---------------------------------------------------------------------------
// // Step 3 — Next of kin / emergency contact
// // ---------------------------------------------------------------------------
// export const nextOfKinSchema = z.object({
//   nextOfKinName: requiredString("Next of kin name", 100),
//   nextOfKinRelationship: z.enum(relationshipEnum.options, {
//     message: "Select a relationship",
//   }),
//   nextOfKinRelationshipOther: optionalString(50),
//   nextOfKinPhone: phoneNumber,
//   nextOfKinEmail: z
//     .union([z.email("Enter a valid email"), z.literal("")])
//     .optional()
//     .transform((val) => (val === "" ? undefined : val)),
// });

// export type NextOfKinInfoValues = z.infer<typeof nextOfKinSchema>;

// // ---------------------------------------------------------------------------
// // Step 4 — Insurance & registration type
// // ---------------------------------------------------------------------------
// export const insuraceFieldsSchema = z.object({
//   patientType: z.enum(patientTypeEnum.options, {
//     message: "Select a patient type",
//   }),
//   insuranceProvider: optionalString(100),
//   insurancePolicyNumber: optionalString(50),
//   insuranceGroupNumber: optionalString(50),
//   insuranceExpiryDate: optionalIsoDateString,
// });

// export type InsuranceValues = z.infer<typeof insuraceFieldsSchema>;

// // ---------------------------------------------------------------------------
// // Step 5 — Consent & review
// // ---------------------------------------------------------------------------
// export const consentSchema = z.object({
//   consentToTreat: z.literal(true, {
//     message: "Consent to treat is required to register the patient",
//   }),
//   consentToShareData: z.boolean(),
// });

// export type ConsentValues = z.infer<typeof consentSchema>;

// // ---------------------------------------------------------------------------
// // Combined schema — the full submit payload
// // ---------------------------------------------------------------------------

// export const patientSchema = z
//   .object({
//     ...personalInfoSchema.shape,
//     ...contactInfoSchema.shape,
//     ...nextOfKinSchema.shape,
//     ...insuraceFieldsSchema.shape,
//     ...consentSchema.shape,
//   })
//   // If any insurance detail is provided, require the provider name + policy
//   // number too, so we never save a half-filled insurance record.
//   .superRefine((data, ctx) => {
//     if (
//       (data.nextOfKinRelationship as any) === "OTHER" &&
//       !data.nextOfKinRelationshipOther
//     ) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["nextOfKinRelationshipOther"],
//         message: "Please specify the relationship",
//       });
//     }
//     if (
//       (data.insurancePolicyNumber ||
//         data.insuranceGroupNumber ||
//         data.insuranceExpiryDate) &&
//       !data.insuranceProvider
//     ) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["insuranceProvider"],
//         message:
//           "Insurance provider is required when other insurance details are entered",
//       });
//     }
//     if (data.insuranceProvider && !data.insurancePolicyNumber) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["insurancePolicyNumber"],
//         message:
//           "Policy number is required when an insurance provider is entered",
//       });
//     }
//   });

// export type PatientFormValues = z.infer<typeof patientSchema>;

// // Default values used to initialize the form so every field is controlled
// // from the start (avoids React's uncontrolled -> controlled input warning).
// export const patientFormDefaultValues: Partial<PatientFormValues> = {
//   firstName: "",
//   lastName: "",
//   preferredName: "",
//   dateOfBirth: "",
//   nationalId: "",
//   religion: "",
//   ethnicity: "",
//   occupation: "",
//   nationality: "",
//   preferredLanguage: "",
//   email: "",
//   phone: "",
//   alternatePhone: "",
//   addressLine1: "",
//   addressLine2: "",
//   city: "",
//   state: "",
//   country: "",
//   postalCode: "",
//   nextOfKinName: "",
//   nextOfKinRelationship: undefined,
//   nextOfKinPhone: "",
//   nextOfKinEmail: "",
//   insuranceProvider: "",
//   insurancePolicyNumber: "",
//   insuranceGroupNumber: "",
//   insuranceExpiryDate: "",
//   consentToShareData: false,
//   consentToTreat: true,
// };

// // ---------------------------------------------------------------------------
// // schema fields. helper method to get all schema fiels
// // ---------------------------------------------------------------------------
// function getSchemaFields<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
//   return Object.keys(schema.shape) as (keyof z.infer<typeof schema>)[];
// }

// // ---------------------------------------------------------------------------
// // Step registry — drives the wizard's progress bar, validation-per-step,
// // and the field list each step is responsible for.
// // ---------------------------------------------------------------------------
// export const stepDefinitions = {
//   personal: {
//     id: "personal",
//     title: "Personal Info",
//     description: "Identity & demographics",
//     schema: personalInfoSchema,
//     // fields: getSchemaFields(personalInfoSchema),
//   },
//   contact: {
//     id: "contact",
//     title: "Contact & address",
//     description: "How to reach the patient",
//     schema: contactInfoSchema,
//     // fields: getSchemaFields(contactInfoSchema),
//   },
//   nextOfKin: {
//     id: "next-of-kin",
//     title: "Next of kin",
//     description: "Emergency contact",
//     schema: nextOfKinSchema,
//     // fields: getSchemaFields(nextOfKinSchema),
//   },
//   insurance: {
//     id: "insurance",
//     title: "Insurance",
//     description: "Coverage & visit type",
//     schema: insuraceFieldsSchema,
//     // fields: getSchemaFields(insuraceSchema),
//   },
//   consent: {
//     id: "consent",
//     title: "Consent & review",
//     description: "Confirm & submit",
//     schema: consentSchema,
//     // fields: getSchemaFields(consentSchema),
//   },
// };
