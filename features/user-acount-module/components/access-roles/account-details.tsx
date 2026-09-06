"use client";

import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { useState } from "react";
import { usersMockData } from "../../user-mock-data";
import { UserProfileCard } from "../account-details/user-profile-card";
import { UsersProfileNavigation } from "../account-details/users-profile-navigation";
import { UserProfileWorkspaceTabs } from "../account-details/user-profile-workspace-tab";

interface AccountDetailsProps {
  userId: string;
}
export function AccountDetails({ userId }: AccountDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const userData = {
    name: "Peter Owusu",
    email: "peterowusu@gmail.com",
    userId: "USR-0023",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    memberSince: "Jan 2024",
  };

  return (
    <div className="space-y-6">
      <UserProfileCard userData={userData} />

      <WorkspaceSection>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="rounded-lg border bg-card p-3">
            <UsersProfileNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </aside>

          <main className="min-w-0 flex-1">
            <UserProfileWorkspaceTabs activeTab={activeTab} userId={userId} />
          </main>
        </div>
      </WorkspaceSection>
    </div>
  );
}
