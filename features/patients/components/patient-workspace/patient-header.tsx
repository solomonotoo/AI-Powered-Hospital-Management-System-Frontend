import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Patient } from "../../types/patient";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatFullName, formatPhoneNumber } from "@/lib/format";

//NB this is not a card
interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  // const fullName = [patient.firstName, patient.middleName, patient.lastName]
  //   .filter(Boolean)
  //   .join("");
  const fullName = formatFullName(
    patient.firstName,patient.middleName,patient.lastName
  );
  const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(
    0
  )}`;


  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col  gap-6 lg:flex-row lg:item-start lg:justify-between">
        {/* Left section */}
        <div className="flex gap-5">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  {fullName}
                </h1>

                <Badge>{patient.status}</Badge>
              </div>

              {patient.preferredName && (
                <p className="text-muted-foreground">
                  Preferred Name: {patient.preferredName}
                </p>
              )}

              <p className="text-sm text-muted-foreground">
                Medical Record Number (MRN): {patient.mrn}
              </p>
            </div>

            <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 xl:grid-cols-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />

                <span>{patient.gender}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />

                <span>
                  {/* {patient.dateOfBirth} ({patient.age} years) */}
                  {formatDate(patient.dateOfBirth)} ({patient.age} years)
                </span>
              </div>

              {patient.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />

                  <span>{formatPhoneNumber(patient.phoneNumber)}</span>
                </div>
              )}

              {patient.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />

                  <span>{patient.email}</span>
                </div>
              )}

              {patient.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />

                  <span>{patient.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right Section */}

        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Patient
          </Button>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Visit
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            National ID
          </p>

          <p className="font-medium">{patient.nationalId ?? "--"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Blood Group
          </p>

          <p className="font-medium">{patient.bloodGroup ?? "--"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Genotype
          </p>

          <p className="font-medium">{patient.genotype ?? "--"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Marital Status
          </p>

          <p className="font-medium">{patient.maritalStatus ?? "--"}</p>
        </div>
      </div>
    </div>
  );
}
