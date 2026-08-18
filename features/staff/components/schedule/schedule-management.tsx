"use client";

import { useState } from "react";
import { ScheduleToolbar } from "./schedule-toolbar/schedule-toolbar";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import ScheduleTable from "./table/schedule-table";
import { staffDataMock } from "../../staff-mock-data";

export function ScheduleManagement() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [shift, setShift] = useState("all");

  //open create schedule modal
  const [openCreateStaffDialog, setOpenCreateStaffDialog] = useState(false);

  const staff = staffDataMock;
  return (
    <>
      <div className="rounded-lg bg-card p-4 mb-4">
        <h2>Staff Management</h2>
        <div>
          <span>Manage staff shift, assignment and departmental coverage</span>
        </div>
      </div>
      <WorkspaceSection
        toolbar={
          <ScheduleToolbar
            search={search}
            onSearchChange={setSearch}
            department={department}
            onDepartmentChange={setDepartment}
            role={role}
            onRoleChange={setRole}
            shift={shift}
            onShiftChange={setShift}
            onCreateStaff={() => setOpenCreateStaffDialog(true)}
          />
        }
      >
        <ScheduleTable staff={staff}/>
      </WorkspaceSection>
    </>
  );
}
