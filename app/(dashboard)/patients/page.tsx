import { PermissionGuard } from "@/components/auth/permission-guard";
import PatientList from "@/features/patients/components/list/patient-list";

/**
 * Content specific to /patients only — the patient list/table goes here.
 * Shared "Patients" heading + tab bar come from the parent layout.tsx.
 */
export default function PatientsIndexPage() {
  return (
    // [FEATURE REFERENCE]: Access restricted to users with PATIENT_READ permission
    <PermissionGuard requiredPermissions="PATIENT_READ">
      <PatientList />
    </PermissionGuard>
  );
}
