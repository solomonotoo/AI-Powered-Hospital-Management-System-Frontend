"use client";

import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { UserProfileCard } from "./user-profile-card";
import { UsersProfileNavigation } from "./users-profile-navigation";
import { UserProfileWorkspaceTabs } from "./user-profile-workspace-tab";
import { useState } from "react";
import { usersMockData } from "../../user-mock-data";

export function AccountDetails() {
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

  const users = usersMockData;

  return (
    <div className="space-y-6">
      <UserProfileCard
        userData={userData}
        userId="user-123" // Pass the actual user ID from your auth system
      />

      <WorkspaceSection>
        <UsersProfileNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <UserProfileWorkspaceTabs activeTab={activeTab} users={users} />
        
      </WorkspaceSection>
    </div>
  );
}
