// Default values used to initialize the form so every field is controlled

import { departmentEnum, roleEnum } from "./enums";
import { StaffFormValues } from "./staff-schema";

// from the start (avoids React's uncontrolled -> controlled input warning).
export const staffFormDefaultValues: Partial<StaffFormValues> = {
  employmentNumber: "",
  firstName: "",
  lastName: "",
  workEmail: "",
  phoneNumber: "",
  employmentDate: "",
  workingHours: "",
  specialisation: "",
};
