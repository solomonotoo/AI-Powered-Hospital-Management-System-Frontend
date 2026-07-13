

// ---------------------------------------------------------------------------
// Step registry — drives the wizard's progress bar, validation-per-step,
// and the field list each step is responsible for.

import { consentSchema, contactInfoSchema, insuraceFieldsSchema, nextOfKinSchema, personalInfoSchema } from "./patient-schema";

// ---------------------------------------------------------------------------
export const stepDefinitions = {
    personal: {
      id: "personal",
      title: "Personal Info",
      description: "Identity & demographics",
      schema: personalInfoSchema,
      // fields: getSchemaFields(personalInfoSchema),
    },
    contact: {
      id: "contact",
      title: "Contact & address",
      description: "How to reach the patient",
      schema: contactInfoSchema,
      // fields: getSchemaFields(contactInfoSchema),
    },
    nextOfKin: {
      id: "next-of-kin",
      title: "Next of kin",
      description: "Emergency contact",
      schema: nextOfKinSchema,
      // fields: getSchemaFields(nextOfKinSchema),
    },
    insurance: {
      id: "insurance",
      title: "Insurance",
      description: "Coverage & visit type",
      schema: insuraceFieldsSchema,
      // fields: getSchemaFields(insuraceSchema),
    },
    consent: {
      id: "consent",
      title: "Consent & review",
      description: "Confirm & submit",
      schema: consentSchema,
      // fields: getSchemaFields(consentSchema),
    },
  };