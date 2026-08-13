"use client";
import { useState } from "react";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { StaffSummaryCards } from "./staff-summary-cards";
import { staffDataMock, StaffSummaryMock } from "../staff-mock-data";
import { SectionCard } from "@/features/shared-features/section-card";
import { StaffToolbar } from "./toolbar/staff-toolbar";
import StaffTable from "./table/staff-table";
import { CreateStaffDialog } from "./create-staff-dialog";

export function StaffOverview() {
  const staffSummary = StaffSummaryMock;
  const staff = staffDataMock;

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  //open create staff modal
  const [openCreateStaffDialog, setOpenCreateStaffDialog] = useState(false);

  // Handle successful facility creation
  const handleStaffCreated = () => {
    // Refresh your facility list here
    console.log("Staff created, refreshing list...");
    // You could refetch data here
  };

  return (
    <>
      <WorkspaceSection
        summary={<StaffSummaryCards summary={staffSummary} />}
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
          <StaffTable staff={staff} />
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
