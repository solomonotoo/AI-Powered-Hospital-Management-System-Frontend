import { UsersFilter } from "./users-filter";

interface UsersFiltersProps {
  department: string;
  onDepartmentChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
}

//department,status and role dropdown

const departmentOptions = [
  { label: "All Department", value: "all" },
  { label: "Radiology", value: "radiology" },
  { label: "Cardiology", value: "cardiology" },
  { label: "Oncology", value: "oncology" },
  { label: "Neurology", value: "neurology" },
  { label: "Orthopedics", value: "orthopedics" },
  { label: "Pediatrics", value: "pediatrics" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Ophthalmology", value: "ophthalmology" },
  { label: "Otolaryngology", value: "otolaryngology" },
  { label: "Urology", value: "urology" },
];

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const roleOptions = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Doctor", value: "doctor" },
  { label: "Nurse", value: "nurse" },
  { label: "Pharmacist", value: "pharmacist" },
  { label: "Technician", value: "technician" },
  { label: "Administrative", value: "administrative" },
  { label: "Billing Staff", value: "billing_staff" },
  { label: "Receptionist", value: "receptionist" },
  { label: "Ward Manager", value: "ward_manager" },
  { label: "Radiologist", value: "radiologist" },
  { label: "Super Admin", value: "super_admin" },
];

export function UsersFilters({
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  role,
  onRoleChange,
}: UsersFiltersProps) {
  return (
    <div className="flex justify-between md:justify-center gap-2 items-center md:ml-20">
      <UsersFilter
        placeholder="Filter by Department"
        options={departmentOptions}
        value={department}
        onValueChange={onDepartmentChange}
      />

      <UsersFilter
        placeholder="Filter by Status"
        options={statusOptions}
        value={status}
        onValueChange={onStatusChange}
      />

      <UsersFilter
        placeholder="Filter by Role"
        options={roleOptions}
        value={role}
        onValueChange={onRoleChange}
      />
    </div>
  );
}
