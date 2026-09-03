"use client";

import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { usersMockData, usersSummaryMockData } from "../user-mock-data";
import { UsersSummaryCards } from "./users-summary-cards";
import { UsersToolbar } from "./toolbar/users-toolbar";
import { useState } from "react";
import { SortState } from "@/features/types/sort-state";
import { SectionCard } from "@/features/shared-features/section-card";
import UsersTable from "./table/users-table";
import { UserSortField,UsersQuery } from "../types/users-query";
import { UsersNavigation } from "./users-navigation";
import { UsersWorkspaceTabs } from "./users-workspace-tab";
import { useUsers } from "../hook/use-users";
import { useUserSummary } from "../hook/use-user-summary";

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
  const [sort, setSort] = useState<{
    field: UserSortField;
    direction: "asc" | "desc";
  }>({
    field: "createdAt",
    direction: "asc",
  });

  const query: UsersQuery = {
    page: page - 1,
    size: pageSize,
    search: search || undefined,
    sortBy: sort.field,
    sortDir: sort.direction,
  };

  // const userMock = usersMockData;
  //const userSumaryMock = usersSummaryMockData;

  const { data, isLoading, isError, error, refetch } = useUsers(query);
  const users = data?.content ?? [];
// console.log("USERS API DATA:", data);
// console.log("USERS CONTENT:", data?.content);


  const { data: summaryData, isLoading: isSummaryLoading, isError: isSummaryError, error: summaryError, refetch: refetchSummary } = useUserSummary();
  const summary = summaryData ?? {};
  return (
    <WorkspaceSection
       summary={<UsersSummaryCards summary={summary} />}
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
            users={users}
          // page={page}
          // pageSize={pageSize}
          // setPage={setPage}
          // setPageSize={setPageSize}
          // totalElements={data?.totalElements ?? 0}
          // totalPages={data?.totalPages ?? 0}
          // isLoading={isLoading}
          // isError={isError}
          // error={error}
          // refetch={refetch}
          />
        </SectionCard>
      </>
    </WorkspaceSection>
  );
}
