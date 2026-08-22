import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { formatDate, formatFullName, formatPhoneNumber } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import { Staff } from "../../types/staff";

interface StaffHeaderProps {
  staff: Staff;
}

export function StaffHeader({ staff }: StaffHeaderProps) {
  if (!staff) {
    return null; // or a loading skeleton
  }
  const fullName = formatFullName(staff.firstName, staff.lastName);
  const initials = `${staff.firstName.charAt(0)}${staff.lastName.charAt(0)}`;

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

                <Badge>{staff.status}</Badge>
              </div>

              {/* {staff.preferredName && (
                <p className="text-muted-foreground">
                  Preferred Name: {staff.preferredName}
                </p>
              )} */}

              <p className="text-sm text-muted-foreground">
                Staff number: {staff.employeeId}
              </p>
            </div>

            <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 xl:grid-cols-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />

                <span>{staff.department}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />

                <span>
                  {/* {staff.dateOfBirth} ({staff.age} years) */}
                  {formatDate(staff.employmentDate)}
                </span>
              </div>

              {staff.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />

                  <span>{formatPhoneNumber(staff.phoneNumber)}</span>
                </div>
              )}

              {staff.workEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />

                  <span>{staff.workEmail}</span>
                </div>
              )}

              {staff.licenseNumber && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />

                  <span>{staff.role}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right Section */}

        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit staff
          </Button>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Visit
          </Button>
        </div>
      </div>

      <Separator />

      {/* <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            National ID
          </p>

          <p className="font-medium">{staff.nationalId ?? "--"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Blood Group
          </p>

          <p className="font-medium">{staff.bloodGroup ?? "--"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Genotype
          </p>

          <p className="font-medium">{staff.genotype ?? "--"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Marital Status
          </p>

          <p className="font-medium">{staff.maritalStatus ?? "--"}</p>
        </div>
      </div> */}
    </div>
  );
}
