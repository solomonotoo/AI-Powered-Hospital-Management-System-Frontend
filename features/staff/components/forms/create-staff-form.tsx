import React, { useState } from "react";
import {
  StaffFormInput,
  StaffFormValues,
  staffSchema,
} from "../../schema/staff-schema";
import { BasicInfoStep } from "./steps/basic-info-step";
import { wizardSteps } from "./wizard-steps";
import { WizardProgressBar } from "./wizard-progress-bar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffFormDefaultValues } from "../../schema/staff-form-default-values";
import { WizardNavigation } from "./wizard-navigation";

interface CreateStaffFormProps {
  onSubmit: (values: StaffFormValues) => void | Promise<void>;
  defaultValues?: Partial<StaffFormInput>;
}

export function CreateStaffForm({
  onSubmit,
  defaultValues = {},
}: CreateStaffFormProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const step = wizardSteps[stepIndex];
  const StepPanel = step.component;

  const isLast = stepIndex === wizardSteps.length - 1;

  //NB without useForm<StaffFormInput, unknown, StaffFormValues>
  const form = useForm<StaffFormInput, unknown, StaffFormValues>({
    resolver: zodResolver(staffSchema),
    // ...staffFormDefaultValues, ...defaultValues  allows the component to support both:
    // creating a new staff member
    // editing an existing staff member
    defaultValues: {
      ...staffFormDefaultValues,
      ...defaultValues,
    },
    mode: "onTouched",
  });

  async function next() {
    // const ok = await form.trigger(fields, { shouldFocus: true });
    // if (ok) setStepIndex((i) => i + 1);
    if (isLast) {
      return;
    }

    if (step.schema) {
      const fields = Object.keys(step.schema.shape) as (keyof StaffFormInput)[];

      const isValid = await form.trigger(fields, {
        shouldFocus: true,
      });

      if (!isValid) {
        return;
      }
    }

    setStepIndex((index) => index + 1);
  }

  async function submit(values: StaffFormValues) {
    await onSubmit(values);
  }
  return (
    <div>
      <WizardProgressBar steps={wizardSteps} activeIndex={stepIndex} />

      <div>
        <form onSubmit={form.handleSubmit(submit)}>
          <StepPanel form={form} />

          <WizardNavigation
            isFirst={stepIndex === 0}
            isLast={isLast}
            loading={form.formState.isSubmitting}
            onBack={() => setStepIndex((i) => i - 1)}
            onNext={next}
          />
        </form>
      </div>
    </div>
  );
}
