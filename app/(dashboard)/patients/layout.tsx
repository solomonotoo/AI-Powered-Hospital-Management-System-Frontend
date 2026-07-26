import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { PatientsNav } from "@/features/patients/components/patients-nav";

/**
 * Shared chrome for every /patients/* route (list, register, admissions,
 * future patient detail pages, etc.).
 *
 * This is what individual pages should NOT redeclare:
 * - The "Patients" section heading
 * - The tab bar for switching between sub-sections
 *
 * Individual page.tsx files under app/(dashboard)/patients/ should only
 * contain content specific to that one route — e.g. register/page.tsx
 * should just render the registration form, not its own heading.
 */
export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="flex flex-col gap-4">
    //   <div className="flex flex-col gap-1">
    //     <h1 className="text-2xl font-semibold tracking-tight">Patients</h1>
    //     <p className="text-sm text-muted-foreground">
    //       Manage patient records, registration, and admissions.
    //     </p>
    //   </div>
    //   <PatientsNav />
    //   <div className="flex flex-col gap-6">{children}</div>
    // </div>

    //the above is extracted to SharedLayout
    <SharedLayout 
    title="Patient" 
    description="Manage patient records, registration, and admissions."
    pageNavbar={<PatientsNav />}
    children = {children}
    />
  );
}
