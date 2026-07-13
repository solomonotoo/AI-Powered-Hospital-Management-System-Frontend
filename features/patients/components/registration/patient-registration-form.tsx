"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientFormValues, patientSchema } from "../../schemas/patient-schema";
import { patientFormDefaultValues } from "../../schemas/patient-default-values";
import { wizardSteps } from "./wizard-steps";
import { WizardProgress } from "./components/wizard-progress";
import { WizardNavigation } from "./components/wizard-navigation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type StepProps = { form: ReturnType<typeof useForm<PatientFormValues>> };

// ---------------------------------------------------------------------------
// PatientRegistrationForm
// ---------------------------------------------------------------------------

export interface PatientRegistrationFormProps {
  onSubmit: (values: PatientFormValues) => void | Promise<void>;
  defaultValues?: Partial<PatientFormValues>;
}

export function PatientRegistrationForm({
  onSubmit,
  defaultValues,
}: PatientRegistrationFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      ...patientFormDefaultValues,
      ...defaultValues,
    },
    mode: "onTouched",
  });

  const step = wizardSteps[stepIndex];
  const StepPanel = step.component;
  const fields = Object.keys(step.schema.shape) as (keyof PatientFormValues)[];
  const isLast = stepIndex === wizardSteps.length - 1;

  async function next() {
    const ok = await form.trigger(fields, { shouldFocus: true });
    if (ok) setStepIndex((i) => i + 1);
  }

  async function submit(values: PatientFormValues) {
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <WizardProgress steps={wizardSteps} activeIndex={stepIndex} />

      <Card className=" ring-0">
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
        </CardHeader>
        <CardDescription className="pl-4">{step.description}</CardDescription>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(submit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLast) {
                e.preventDefault();
                next();
              }
            }}
          >
            <StepPanel form={form} />

            {/* <div className="mt-8 flex justify-between border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStepIndex((i) => i - 1)}
                disabled={stepIndex === 0 || submitting}
              >
                Back
              </Button>
              {isLast ? (
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Registering..." : "Register patient"}
                </Button>
              ) : (
                <Button type="button" onClick={next}>
                  Next
                </Button>
              )}
            </div> */}
            <WizardNavigation
              isFirst={stepIndex === 0}
              isLast={isLast}
              loading={submitting}
              onBack={() => setStepIndex((i) => i - 1)}
              onNext={next}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
