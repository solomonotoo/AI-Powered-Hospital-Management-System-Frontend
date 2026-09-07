"use client";

import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { UsersSummaryCards } from "./users-summary-cards";
import { UsersToolbar } from "./toolbar/users-toolbar";
import { useState } from "react";
import { SectionCard } from "@/features/shared-features/section-card";
import { UserSortField, UsersQuery } from "../types/users-query";
import { UsersNavigation } from "./users-navigation";
import { UsersWorkspaceTabs } from "./users-workspace-tab";
import { useUsers } from "../hook/use-users";
import { useUserSummary } from "../hook/use-user-summary";
import { CreateCredentialDialog } from "./create-credential-dialog"; // Import modern credential creation dialog

export function UserManagement() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("usersTable");
  // State to control credential creation modal visibility
  const [openCreateCredentialDialog, setOpenCreateCredentialDialog] = useState(false);
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
          // Open the credential creation dialog when New Credential button is clicked
          onCreateCredential={() => setOpenCreateCredentialDialog(true)}
        />
      }
    >
      <>
        <UsersNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <SectionCard>
          <UsersWorkspaceTabs
            activeTab={activeTab}
            users={users}
          />
        </SectionCard>
      </>
      {/* Modern credential creation dialog */}
      <CreateCredentialDialog
        open={openCreateCredentialDialog}
        onOpenChange={setOpenCreateCredentialDialog}
        onSuccess={() => {
          // Refetch users table and summary data upon successful credential provisioning
          refetch();
          refetchSummary();
        }}
      />
    </WorkspaceSection>
  );
}
