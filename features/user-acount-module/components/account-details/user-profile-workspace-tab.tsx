import { Users } from "../../types/users";
import { UserProfileAccessRoles } from "../access-roles/user-profile-access-roles";
import { UserProfileActivity } from "./user-profile-activity";
import { UserProfileAuthentication } from "./user-profile-authentication";
import { UserProfileMFA } from "./user-profile-mfa";
import { UserProfileOverview } from "./user-profile-overview";
import { UserProfileSessions } from "./user-profile-sessions";

//NB this file will allow tab content to change when you click on a tab
interface WorkspaceTabsProps {
  activeTab: string;
  users: Users;
}

// interface WorkspaceTabComponentProps {
//   users: Users;
// }

// const ComingSoon: ComponentType<WorkspaceTabComponentProps> = () => (
//   <div className="rounded-xl border bg-card p-8 text-center">
//     <h2 className="text-lg font-semibold">Coming Soon</h2>

//     <p className="mt-2 text-muted-foreground">
//       This module is still under development.
//     </p>
//   </div>
// );

// const tabRegistry: Record<string, ComponentType<WorkspaceTabComponentProps>> = {
//   pending: ComingSoon,
//   lockedAccounts: ComingSoon,
//   securityEvents: ComingSoon,
// };

//updated

function ComingSoon() {
  return (
    <div className="rounded-xl border bg-card p-8 text-center">
      <h2 className="text-lg font-semibold">Coming Soon</h2>

      <p className="mt-2 text-muted-foreground">
        This module is still under development.
      </p>
    </div>
  );
}

export function UserProfileWorkspaceTabs({
  activeTab,
  users,
}: WorkspaceTabsProps) {
  // const ActiveTab = tabRegistry[activeTab] ?? UsersTable;
  // return <ActiveTab users={users} />;

  switch (activeTab) {
    case "overview":
      return <UserProfileOverview />;

    case "access":
      return <UserProfileAccessRoles />;

    case "authentication":
      return <UserProfileAuthentication />;

    case "mfa":
      return <UserProfileMFA />;
    case "userSessions":
      return <UserProfileSessions />;
    case "activity":
      return <UserProfileActivity />;

    default:
      return <UserProfileOverview />;
  }
}
