import z from "zod";

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

export const optionalPhone = (label = "Phone") =>
  z
    .string()
    .regex(/^[\+\d\s\-\(\)]{10,20}$/, `${label} format is invalid`)
    .optional()
    .transform((val) => (val === "" ? undefined : val));

export const requiredPhone = (label = "Phone") =>
  z
    .string()
    .regex(/^[\+\d\s\-\(\)]{10,20}$/, `${label} format is invalid`)
    .min(1, `${label} is required`);
