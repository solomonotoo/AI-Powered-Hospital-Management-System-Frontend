// ---------------------------------------------------------------------------
// Step registry — drives the wizard's progress bar, validation-per-step,
// and the field list each step is responsible for.
// ---------------------------------------------------------------------------

import {
  basicInformationSchema,
  employmentAndAssignmentSchema,
  professionalInformationSchema,
} from "./staff-schema";

export const staffStepDefinitions = {
  basicInfo: {
    id: "personal",
    title: "Personal Info",
    description: "Identity",
    schema: basicInformationSchema,
  },
  employment: {
    id: "employment",
    title: "Employment Info",
    description: "Employment Basic Info ",
    schema: employmentAndAssignmentSchema,
  },
  professional: {
    id: "profession",
    title: "Professional Info",
    description: "Profession info",
    schema: professionalInformationSchema,
  },
  review: {
    id: "review",
    title: "Review Info",
    description: "Review your information",
    schema: undefined,
  },
};
