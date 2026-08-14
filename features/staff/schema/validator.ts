import z from "zod";

// ---------------------------------------------------------------------------
// Reusable primitive validators
// ---------------------------------------------------------------------------

// E.164-ish phone validator. Loose on purpose -- Ghana numbers, international
// patients, landlines with extensions, etc. Just guards against garbage input.
export const requiredPhone = (label = "Phone") =>
  z
    .string()
    .trim()
    .regex(/^[\+\d\s\-\(\)]{10,20}$/, `${label} format is invalid`)
    .min(1, `${label} is required`);

export const optionalPhone = (label = "Phone") =>
  z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .refine(
      (value) => value === undefined || /^[+\d\s\-()]{10,20}$/.test(value),
      `${label} format is invalid`
    );

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

export const optionalString = (max = 150) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((val) => (val === "" ? undefined : val));

export const requiredString = (label: string, max = 100) =>
  z.string().trim().min(1, `${label} is required`).max(max);

export const optionalEmail = z
  .email("Invalid email format")
  .optional()
  .transform((val) => (val === "" ? undefined : val));

export const requiredEmail = z
  .email("Invalid email format")
  .min(1, "Email is required");

export const isoTime = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format. Expected HH:MM");

  export const bigDecimal = z
  .string()
  .trim()
  .refine(
    (val) => val === "" || /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(val),
    { message: "Please enter a valid decimal number" }
  )
  .transform((val) => (val === "" ? undefined : val))
  .optional();
