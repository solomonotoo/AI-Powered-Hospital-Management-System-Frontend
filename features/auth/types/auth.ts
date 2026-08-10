import z from "zod";
import { loginSchema, signupSchema } from "../schema/auth";

export type LoginRequest = z.infer<typeof loginSchema>;

export interface LoginResponse {
  token: string;
  expiresAt: string;
  staffId: string;
  fullName: string;
  role: string;
  mustChangePassword: boolean;
}

export type CreateCredentialRequest = z.infer<typeof signupSchema>;
