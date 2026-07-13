
import { stepDefinitions } from "@/features/patients/schemas/patient-step-definitions";
import { ConsentStep } from "@/features/patients/components/registration/steps/consent-step";
import { ContactInfoStep } from "@/features/patients/components/registration/steps/contact-info-step";
import { InsuranceStep } from "@/features/patients/components/registration/steps/insurance-step";
import { NextOfKinStep } from "@/features/patients/components/registration/steps/next-of-kin-step";
import { PersonalInfoStep } from "@/features/patients/components/registration/steps/personal-info-step";

export const wizardSteps = [
    {
      ...stepDefinitions.personal,
      component: PersonalInfoStep,
    },
    {
      ...stepDefinitions.contact,
      component: ContactInfoStep,
    },
    {
      ...stepDefinitions.nextOfKin,
      component: NextOfKinStep,
    },
    {
      ...stepDefinitions.insurance,
      component: InsuranceStep,
    },
    {
      ...stepDefinitions.consent,
      component: ConsentStep,
    },
  ];