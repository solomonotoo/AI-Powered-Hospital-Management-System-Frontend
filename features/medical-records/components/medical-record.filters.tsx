import { MedicalRecordsFilter } from "./medical-record-filter";

interface MedicalRecordsFiltersProps {
  department: string;
  encounterType: string;
  status: string;
  onDepartmentChange: (value: string) => void;
  onEncounterTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const departmentOptions = [
  { label: "All Departments", value: "all" },
  { label: "OPD", value: "OPD" },
  { label: "Medical", value: "Medical" },
  { label: "Surgery", value: "Surgery" },
];

const medicalRecordsStatusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Archive", value: "ARCHIVE" },
  { label: "Pending", value: "PENDING" },
];

const medicalRecordsEncounterTypeOptions = [
  { label: "All Encounters", value: "all" },
  { label: "OPD", value: "OPD" },
  { label: "IPD", value: "IPD" },
  { label: "Emergency", value: "EMERGENCY" },
];

export function MedicalRecordsFilters({
  department,
  encounterType,
  status,
  onDepartmentChange,
  onEncounterTypeChange,
  onStatusChange,
}: MedicalRecordsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <MedicalRecordsFilter
        placeholder="Department"
        value={department}
        options={departmentOptions}
        onValueChange={onDepartmentChange}
      />

      <MedicalRecordsFilter
        placeholder="Encounter"
        value={encounterType}
        options={medicalRecordsEncounterTypeOptions}
        onValueChange={onEncounterTypeChange}
      />

      <MedicalRecordsFilter
        placeholder="Status"
        value={status}
        options={medicalRecordsStatusOptions}
        onValueChange={onStatusChange}
      />
    </div>
  );
}
