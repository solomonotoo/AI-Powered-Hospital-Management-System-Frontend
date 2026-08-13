import { staffStepDefinitions } from "../../schema/staff-step-definitions";
import { BasicInfoStep } from "./steps/basic-info-step";
import { EmploymentAndAssignmentStep } from "./steps/employment-and-assignment-step";
import { ProfessionalInfoStep } from "./steps/professional-info-step";
import { ReviewStep } from "./steps/review-step";

export const wizardSteps = [
  { ...staffStepDefinitions.basicInfo, component: BasicInfoStep },
  {
    ...staffStepDefinitions.employment,
    component: EmploymentAndAssignmentStep,
  },
  { ...staffStepDefinitions.professional, component: ProfessionalInfoStep },
  { ...staffStepDefinitions.review, component: ReviewStep },
];
