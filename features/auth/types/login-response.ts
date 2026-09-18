import z from "zod";
import { loginSchema, signupSchema } from "../schema/auth";

export type LoginRequest = z.infer<typeof loginSchema>;

export interface AccessibleFacility {
  id: string;
  code: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  staffId: string;
  fullName: string;
  role: string;
  mustChangePassword: boolean;
  facilityId: string;
  facilityName?: string;
  facilityCode?: string;
  canSelectFacility?: boolean;
  accessibleFacilities?: AccessibleFacility[];
}

export type CreateCredentialRequest = z.infer<typeof signupSchema>;

export interface FirstLoginPasswordChangeRequest {
  newPassword: string;
  confirmPassword?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface SelectFacilityRequest {
  facilityId: string;
}

