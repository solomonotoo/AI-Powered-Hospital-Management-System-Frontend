"use client";

import { UserSummaryResponse } from "../../types/users";
import { UserProfileRoles } from "./roles/user-profile-roles";
import { UserProfilePermissions } from "./permissions/user-profile-permissions";
import { UserProfileOverview } from "./tabs/user-profile-overview";
import { UserProfileSessions } from "./tabs/user-profile-sessions";
import { UserProfileActivity } from "./tabs/user-profile-activity";
import { UserProfileAuthentication } from "./tabs/user-profile-authentication";
import { UserProfileMFA } from "./tabs/user-profile-mfa";

interface UserProfileWorkspaceTabsProps {
  activeTab: string;
  userId: string;
  user?: UserSummaryResponse | null;
}

export function UserProfileWorkspaceTabs({
  activeTab,
  userId,
  user,
}: UserProfileWorkspaceTabsProps) {
  switch (activeTab) {
    case "overview":
      return <UserProfileOverview userId={userId} user={user} />;

    case "access":
      return <UserProfileRoles userId={userId} />;

    case "permissions":
      return <UserProfilePermissions userId={userId} />;

    case "authentication":
      return <UserProfileAuthentication userId={userId} user={user} />;

    case "mfa":
      return <UserProfileMFA userId={userId} user={user} />;

    case "userSessions":
    case "sessions":
      return <UserProfileSessions userId={userId} />;

    case "activity":
      return <UserProfileActivity userId={userId} />;

    default:
      return <UserProfileOverview userId={userId} user={user} />;
  }
}
