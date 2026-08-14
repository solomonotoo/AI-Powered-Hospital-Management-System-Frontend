import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { staffFormDefaultValues } from "../../schema/staff-form-default-values";
import {
  StaffFormInput,
  StaffFormValues,
  staffSchema,
} from "../../schema/staff-schema";
import { WizardNavigation } from "./wizard-navigation";
import { WizardProgressBar } from "./wizard-progress-bar";
import { wizardSteps } from "./wizard-steps";

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

  async function registerStaff() {
    await form.handleSubmit(submit)();
  }
  return (
    <div>
      <WizardProgressBar steps={wizardSteps} activeIndex={stepIndex} />

      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
        }}>
          <StepPanel form={form} />

          <WizardNavigation
            isFirst={stepIndex === 0}
            isLast={isLast}
            loading={form.formState.isSubmitting}
            onBack={() =>
              setStepIndex((current) => Math.max(current - 1, 0))
            }
            onNext={next}
            onSubmit={registerStaff}
          />
        </form>
      </div>
    </div>
  );
}
