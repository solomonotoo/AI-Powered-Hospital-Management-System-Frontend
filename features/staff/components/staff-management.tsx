"use client";
import { useState } from "react";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { StaffSummaryCards } from "./staff-summary-cards";
import { SectionCard } from "@/features/shared-features/section-card";
import { StaffToolbar } from "./toolbar/staff-toolbar";
import StaffTable from "./table/staff-table";
import { CreateStaffDialog } from "./create-staff-dialog";
import { useStaffSummary } from "../hooks/use-staff-summary";
import { useStaff } from "../hooks/use-staff";
import { StaffQuery } from "../types/staff-query";
import { SortState } from "@/features/types/sort-state";
import { toStaff } from "../mapper/staff-mapper";
import { StaffSummaryMock, staffDataMock } from "../staff-mock-data";

export function StaffManagement() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  //pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //sorting state
  const [sort, setSort] = useState<SortState>({
    field: "fullName",
    direction: "asc",
  });

  //open create staff modal
  const [openCreateStaffDialog, setOpenCreateStaffDialog] = useState(false);

  const staffMock = staffDataMock;

  //NB you can check api.query.ts
  //query for pagination and filtering of the API
  //page: page number (0-indexed)
  //size: number of items per page
  //sort: sort field
  //search: search query
  const query: StaffQuery = {
    page: page - 1,
    size: pageSize,
    search: search || undefined,
    sort: `${sort.field},${sort.direction}`,
    department: department !== "all" ? department : undefined,
    role: role !== "all" ? role : undefined,
    status: status !== "all" ? status : undefined,
  };

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    error: summaryError,
  } = useStaffSummary();
  const {
    data: staff,
    isLoading: isStaffLoading,
    isError: isStaffError,
    error: staffError,
  } = useStaff(query);

  // const staffSummary = StaffSummaryMock;
  const listStaff = staff?.content.map(toStaff) ?? [];

  // Handle successful facility creation
  const handleStaffCreated = () => {
    // Refresh your facility list here
    console.log("Staff created, refreshing list...");
    // You could refetch data here
  };

  return (
    <>
      <WorkspaceSection
        summary={<StaffSummaryCards summary={summary} />}
        toolbar={
          <StaffToolbar
            search={search}
            onSearchChange={setSearch}
            department={department}
            onDepartmentChange={setDepartment}
            role={role}
            onRoleChange={setRole}
            status={status}
            onStatusChange={setStatus}
            onCreateStaff={() => setOpenCreateStaffDialog(true)}
          />
        }
      >
        <SectionCard>
          <StaffTable
            staff={
              // listStaff
              staffMock
            }
          />
        </SectionCard>
      </WorkspaceSection>
      <CreateStaffDialog
        open={openCreateStaffDialog}
        onOpenChange={setOpenCreateStaffDialog}
        onSuccess={handleStaffCreated}
      />
    </>
  );
}
