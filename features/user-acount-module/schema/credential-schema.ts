import { z } from "zod";

// Zod schema strictly matching OpenAPI CreateCredentialRequest definition
export const createCredentialSchema = z.object({
  // UUID formatted staff member identifier
  staffId: z
    .string()
    .min(1, "Staff member is required")
    .uuid("Invalid Staff ID: must be a valid UUID format"),

  // Login email address
  loginEmail: z
    .string()
    .min(1, "Login email is required")
    .email("Please enter a valid email address"),

  // Temporary password adhering to hospital authentication constraints (8-30 chars)
  temporaryPassword: z
    .string()
    .min(8, "Temporary password must be at least 8 characters long")
    .max(30, "Temporary password cannot exceed 30 characters"),
});

// Infer TypeScript types from schema
export type CreateCredentialFormValues = z.infer<typeof createCredentialSchema>;
