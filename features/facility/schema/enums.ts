import z from "zod";

export const facilityType = z.enum([
  "TEACHING_HOSPITAL",
  "REGIONAL_HOSPITAL",
  "DISTRICT_HOSPITAL",
  "POLYCLINIC",
  "HEALTH_CENTRE",
  "CHIPS",
]);

export const status = z.enum(["ACTIVE", "INACTIVE", "PENDING"]);
