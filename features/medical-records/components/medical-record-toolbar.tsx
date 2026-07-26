import { MedicalRecordSearch } from "./medical-record-search";
import { MedicalRecordToolbarActions } from "./medical-record-toolbar-actions";
import { MedicalRecordsFilters } from "./medical-record.filters";

interface MedicalRecordToolbarProps {
  search: string;
  department: string;
  encounterType: string;
  status: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onEncounterTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function MedicalRecordToolbar({
  search,
  department,
  encounterType,
  status,
  onSearchChange,
  onDepartmentChange,
  onEncounterTypeChange,
  onStatusChange,
}: MedicalRecordToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <MedicalRecordSearch value={search} onChange={onSearchChange} />

      <div className="flex items-center gap-2">
        <MedicalRecordsFilters
          department={department}
          encounterType={encounterType}
          status={status}
          onDepartmentChange={onDepartmentChange}
          onEncounterTypeChange={onEncounterTypeChange}
          onStatusChange={onStatusChange}
        />

        <MedicalRecordToolbarActions
          onRefresh={() => console.log("Refresh medical records")}
          onExport={() => console.log("Export medical records")}
          onNewRecord={() => console.log("New medical record")}
        />
      </div>
    </div>
  );
}
