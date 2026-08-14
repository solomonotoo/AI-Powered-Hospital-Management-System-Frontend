import { z } from "zod";

export const genderEnum = z.enum([
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);

export const statusEnum = z.enum([
  "ACTIVE",
  "INACTIVE",
  // "RESIGNED",
  // "TERMINATED",
  // "LEAVE"
]);

export const roleEnum = z.enum([
  "DOCTOR",
  "NURSE",
  "ADMIN",
  "BILLING_STAFF",
  "RECEPTIONIST",
  "WARD_MANAGER",
  "LAB_TECH",
  "PHARMACIST",
  "RADIOLOGIST",
  "SUPER_ADMIN",
  "ADMINSTRATIVE",
]);

export const departmentEnum = z.enum([
  "RADIOLOGY",
  "CARDIOLOGY",
  "ONCOLOGY",
  "NEUROLOGY",
  "ORTHOPEDICS",
  "PEDIATRICS",
  "DERMATOLOGY",
  "OTOLARYNGOLOGY",
  "OPHTHALMOLOGY",
  "UROLOGY",
  "SURGERY",
  "EMERGENCY",
  "PHARMACY",
  "OPD",
]);
