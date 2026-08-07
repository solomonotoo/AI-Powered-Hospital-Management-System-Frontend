import z from "zod";

export const facilityType = z.enum([
  "TEACHING_HOSPITAL",
  "REGIONAL_HOSPITAL",
  "DISTRICT_HOSPITAL",
  "POLYCLINIC",
  "HEALTH_CENTRE",
  "CHIPS",
  "SPECIALIST_HOSPITAL",
]);

export const facilityStatus = z.enum(["ACTIVE", "INACTIVE", "PENDING_APPROVAL"]);
