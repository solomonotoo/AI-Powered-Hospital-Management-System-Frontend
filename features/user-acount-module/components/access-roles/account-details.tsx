
"use client";

import { useState } from "react";

import { WorkspaceSection } from "@/features/shared-features/workspace-section";

import { UsersProfileNavigation } from "../account-details/users-profile-navigation";
import { UserProfileWorkspaceTabs } from "../account-details/user-profile-workspace-tab";
import { UserProfileCard } from "../account-details/user-profile-card";
import { useUserProfile } from "../../hook/use-user-profile";



interface AccountDetailsProps {
  userId: string;
}

export function AccountDetails({
  userId,
}: AccountDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: user,
    isLoading,
    isError,
  } = useUserProfile(userId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <UserProfileCard isLoading />

        <WorkspaceSection>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="rounded-lg border bg-card p-3">
              <UsersProfileNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </aside>

            <main className="min-w-0 flex-1">
              <div className="flex items-center justify-center rounded-lg border p-10">
                <p className="text-sm text-muted-foreground">
                  Loading user profile...
                </p>
              </div>
            </main>
          </div>
        </WorkspaceSection>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-semibold text-destructive">
          Unable to load user
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          We could not retrieve the selected user from the user
          accounts service.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold">
          User not found
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          No user was found for ID{" "}
          <span className="font-mono">{userId}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UserProfileCard user={user} />

      <WorkspaceSection>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="rounded-lg border bg-card p-3">
            <UsersProfileNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </aside>

          <main className="min-w-0 flex-1">
            <UserProfileWorkspaceTabs
              activeTab={activeTab}
              userId={userId}
            />
          </main>
        </div>
      </WorkspaceSection>
    </div>
  );
}