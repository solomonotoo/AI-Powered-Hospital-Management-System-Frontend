"use client";

import { useState } from "react";
import { ScheduleToolbar } from "./schedule-toolbar/schedule-toolbar";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";

export function ShiftSchedule() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  //open create schedule modal
  const [openCreateStaffDialog, setOpenCreateStaffDialog] = useState(false);
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
            status={status}
            onStatusChange={setStatus}
            onCreateStaff={() => setOpenCreateStaffDialog(true)}
          />
        }
      >
        <div>table</div>
      </WorkspaceSection>
    </>
  );
}
