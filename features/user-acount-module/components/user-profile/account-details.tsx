"use client";

import { useState } from "react";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { ProfileCard } from "./profile-card";
import { UserProfileNavigation } from "./user-profile-navigation";
import { UserProfileWorkspaceTabs } from "./user-profile-workspace-tabs";
import { useUserProfile } from "../../hook/use-user-profile";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

interface AccountDetailsProps {
  userId: string;
  initialTab?: string;
}

export function AccountDetails({
  userId,
  initialTab = "overview",
}: AccountDetailsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserProfile(userId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ProfileCard isLoading />

        <WorkspaceSection>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <UserProfileNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <main className="min-w-0 flex-1">
              <div className="flex h-64 items-center justify-center rounded-xl border bg-card p-10 shadow-sm">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <RefreshCw className="size-4 animate-spin text-primary" />
                  <span>Loading user profile...</span>
                </div>
              </div>
            </main>
          </div>
        </WorkspaceSection>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <AlertCircle className="mx-auto size-10 text-destructive" />
          <h2 className="mt-3 text-lg font-semibold text-destructive">
            Unable to load user profile
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "We could not retrieve the user account from the backend service."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/users" className="gap-2">
                <ArrowLeft className="size-4" />
                Back to Users
              </Link>
            </Button>
            <Button onClick={() => refetch()} className="gap-2">
              <RefreshCw className="size-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileCard user={user} />

      <WorkspaceSection>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <UserProfileNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <main className="min-w-0 flex-1">
            <UserProfileWorkspaceTabs
              activeTab={activeTab}
              userId={userId}
              user={user}
            />
          </main>
        </div>
      </WorkspaceSection>
    </div>
  );
}
