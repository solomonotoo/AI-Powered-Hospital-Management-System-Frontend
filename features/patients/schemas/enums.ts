// ---------------------------------------------------------------------------
// Shared enums (mirror the backend enums exactly so payloads serialize 1:1)
// ---------------------------------------------------------------------------

import z from "zod";

export const genderEnum = z.enum([
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);

export const bloodGroupEnum = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

export const maritialStatusEnum = z.enum([
  "SINGLE",
  "MARRIED",
  "DIVORCED",
  "WIDOWED",
]);

export const patientTypeEnum = z.enum(["OPD", "IPD", "EMERGENCY", "DAYCASE"]);

export const relationshipEnum = z.enum([
  "SPOUSE",
  "PARENT",
  "CHILD",
  "SIBLING",
  "GUARDIAN",
  "RELATIVE",
  "FRIEND",
  "OTHER",
]);
