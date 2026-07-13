import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Content specific to /patients/admissions only. Shared "Patients" heading
 * + tab bar come from the parent layout.tsx.
 */
export default function PatientAdmissionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admissions</CardTitle>
        <CardDescription>
          Replace this with the current admissions list for this facility.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Admissions table goes here.
      </CardContent>
    </Card>
  );
}
