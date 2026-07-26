import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Patient } from "../../types/patient";
import { SectionCard } from "@/features/shared-features/section-card";
import { InfoRow } from "@/features/shared-features/info-row";

//this component render the patient overview content

interface PatientOverviewProps {
  patient: Patient;
}
export function PatientOverview({ patient }: PatientOverviewProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* <Card>
        <CardHeader>
          <CardTitle>Demographics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow label="Gender" value={patient.gender} />
          <InfoRow label="Date of Birth" value={patient.dateOfBirth} />
          <InfoRow label="Blood Group" value={patient.bloodGroup} />
          <InfoRow label="Genotype" value={patient.genotype} />
          <InfoRow label="Nationlity" value={patient.nationality} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow label="Phone" value={patient.phoneNumber} />
          <InfoRow label="Email" value={patient.email} />
          <InfoRow label="Address" value={patient.address} />
          <InfoRow label="City" value={patient.city} />
          <InfoRow label="Country" value={patient.country} />
        </CardContent>
      </Card> */}

      <SectionCard title="Demographics">
        <InfoRow label="Gender" value={patient.gender} />
        <InfoRow label="Date of Birth" value={patient.dateOfBirth} />
        <InfoRow label="Blood Group" value={patient.bloodGroup} />
        <InfoRow label="Genotype" value={patient.genotype} />
        <InfoRow label="Nationlity" value={patient.nationality} />
      </SectionCard>

      <SectionCard title="Contact Information">
        <InfoRow label="Phone" value={patient.phoneNumber} />
        <InfoRow label="Email" value={patient.email} />
        <InfoRow label="Address" value={patient.address} />
        <InfoRow label="City" value={patient.city} />
        <InfoRow label="Country" value={patient.country} />
      </SectionCard>
    </div>
  );
}

//for reusability sake this will be moved to /shared/info-row.tsx. it will be used
//in multiple places in patient feature
// interface InfoRowProps {
//   label: string;
//   value?: string;
// }
// function InfoRow({ label, value }: InfoRowProps) {
//   return (
//     <div className="flex items-center justify-between border-b pb-2 last:border-none">
//       <span className="text-muted-foreground">{label}</span>
//       <span className="font-medium">{value || "--"}</span>
//     </div>
//   );
// }
