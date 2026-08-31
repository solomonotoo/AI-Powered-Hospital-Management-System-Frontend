"use client";

import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { usersMockData, usersSummaryMockData } from "../user-mock-data";
import { UsersSummaryCards } from "./users-summary-cards";
import { UsersToolbar } from "./toolbar/users-toolbar";
import { useState } from "react";
import { SortState } from "@/features/types/sort-state";
import { SectionCard } from "@/features/shared-features/section-card";
import UsersTable from "./table/users-table";
import { UsersQuery } from "../types/users-query";
import { UsersNavigation } from "./users-navigation";
import { UsersWorkspaceTabs } from "./users-workspace-tab";

export function UserManagement() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("usersTable");
  //pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //sorting state
  const [sort, setSort] = useState<SortState>({
    field: "fullName",
    direction: "asc",
  });

  const query: UsersQuery = {
    page: page - 1,
    size: pageSize,
    search: search || undefined,
    sort: `${sort.field},${sort.direction}`,
    department: department !== "all" ? department : undefined,
    role: role !== "all" ? role : undefined,
    status: status !== "all" ? status : undefined,
  };

  const userMock = usersMockData;
  const userSumaryMock = usersSummaryMockData;

  return (
    <WorkspaceSection
      summary={<UsersSummaryCards summary={userSumaryMock} />}
      toolbar={
        <UsersToolbar
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          role={role}
          onRoleChange={setRole}
          status={status}
          onStatusChange={setStatus}
        />
      }
    >
      <>
        <UsersNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <SectionCard>
          <UsersWorkspaceTabs 
            activeTab={activeTab}
            users={usersMockData}

          />
        </SectionCard>
      </>
    </WorkspaceSection>
  );
}
