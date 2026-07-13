// ---------------------------------------------------------------------------
// Reusable primitive validators
// ---------------------------------------------------------------------------

import z from "zod";

// E.164-ish phone validator. Loose on purpose -- Ghana numbers, international
// patients, landlines with extensions, etc. Just guards against garbage input.
export const phoneNumber = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .regex(/^[+]?[\d\s-()]{7,20}$/, "Enter a valid phone number");

export const optionalPhoneNumber = z
  .union([phoneNumber, z.literal("")])
  .optional()
  .transform((val) => (val === "" ? undefined : val));

export const requiredString = (label: string, max = 100) =>
  z.string().trim().min(1, `${label} is required`).max(max);

export const optionalString = (max = 150) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((val) => (val === "" ? undefined : val));

// Dates come out of <input type="date"> as "YYYY-MM-DD" strings; we validate
// the string here and convert to Date objects only at the very edge
// (submit handler), so RHF's controlled inputs stay simple strings.
export const isoDateString = z
  .string()
  .min(1, "Date is required")
  .refine((val) => !Number.isNaN(Date.parse(val)), "Enter a valid date");

export const optionalIsoDateString = z
  .union([isoDateString, z.literal("")])
  .optional()
  .transform((val) => (val === "" ? undefined : val));
