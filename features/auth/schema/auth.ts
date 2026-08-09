import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(30, "Password must not exceed 30 characters"),
});

export const signupSchema = z.object({
  staffId: z.uuid("Invalid Staff ID (must be a valid UUID)"),
  loginEmail: z.string().email("Invalid email address"),
  temporaryPassword: z
    .string()
    .min(8, "Temporary password must be at least 8 characters")
    .max(30, "Temporary password must not exceed 30 characters"),
});
