import { medicalRecordMockData } from "../medical-records-mocked-data";
import { MedicalRecordSummaryCards } from "./medical-record-summary-cards";
import { MedicalRecordTable } from "./medical-record-table";
import { useMemo, useState } from "react";
import { MedicalRecord } from "../types/medical-records";
import { MedicalRecordToolbar } from "./medical-record-toolbar";
import { SortState } from "@/features/types/sort-state";
import { SectionCard } from "@/features/shared-features/section-card";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";

import { Patient } from "@/features/patients/types/patient";

interface MedicalRecordTabProps {
  // medicalRecords: MedicalRecord;
  patient: Patient;
}

//export function MedicalRecordTab({ medicalRecords }: MedicalRecordTabProps) {
export function MedicalRecordTab({ patient }: MedicalRecordTabProps) {
  const [search, setSearch] = useState("");
  const [encounterType, setEncounterType] = useState("all");
  const [medicalStatus, setMedicalStatus] = useState("all");
  const [department, setDepartment] = useState("all");
  const [page, setPage] = useState(1); //page
  //const [size] = useState(10); //number items per page
  const [pageSize, setPageSize] = useState(10);

  const records = medicalRecordMockData;

  //sorting state
  const [sort, setSort] = useState<SortState>({
    field: "visitDate",
    direction: "desc",
  });


  const filteredMedicalRecord = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !keyword ||
        record.diagnosis.toLowerCase().includes(keyword) ||
        record.chiefComplaint?.toLowerCase().includes(keyword);

      const matchesType =
        encounterType === "all" || record.encounterType === encounterType;

      const matchesStatus =
        medicalStatus === "all" || record.status === medicalStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, encounterType, medicalStatus]);

  return (
    <WorkspaceSection
      summary={
        <MedicalRecordSummaryCards medicalRecords={filteredMedicalRecord} />
      }
      toolbar={
        <MedicalRecordToolbar
          search={search}
          department={department}
          encounterType={encounterType}
          status={medicalStatus}
          onSearchChange={setSearch}
          onDepartmentChange={setDepartment}
          onEncounterTypeChange={setEncounterType}
          onStatusChange={setMedicalStatus}
        />
      }
    >

      <SectionCard title="Patient Medical Records">
        <MedicalRecordTable records={filteredMedicalRecord} sort={sort} onSortChange={setSort} />
      </SectionCard>
    </WorkspaceSection>
  );
}
