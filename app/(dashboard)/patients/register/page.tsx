"use client";

import { PatientRegistrationForm } from "@/features/patients/components/registration/patient-registration-form";
import { useCreatePatient } from "@/features/patients/hooks/use-create-patient";

export default function PatientRegisterPage() {

  const createPatient = useCreatePatient();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Register patient
        </h1>
        <p className="text-sm text-muted-foreground">
          Create a new patient record for this facility.
        </p>
      </div>
      <PatientRegistrationForm
        onSubmit={async (values) => {
          await createPatient.mutateAsync(values);
        }}
      />
    </div>
  );
}
