import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, "Username should have a least 2 character")
    .max(30, "Username should not be exceed 30 character"),
  password: z
    .string()
    .min(8, "Password should have at least than 8 characters")
    .max(30, "Password should not more than 30 characters"),
});

export const signupSchema = z.object({
  email: z.email("Invalid email address"),
  phoneNumber: z.number(),
  password: z
    .string()
    .min(2, "Password should have at least 8 character")
    .max(30, "Password should not be exceed 30 character"),
});
