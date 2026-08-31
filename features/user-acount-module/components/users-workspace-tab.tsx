// Rather than using:

import { ComponentType } from "react";
import { Users } from "../types/users";
import UsersTable from "./table/users-table";

//NB this file will allow tab content to change when you click on a tab
interface WorkspaceTabsProps {
  activeTab: string;
  users: Users[];
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

export function UsersWorkspaceTabs({ activeTab, users }: WorkspaceTabsProps) {
  // const ActiveTab = tabRegistry[activeTab] ?? UsersTable;
  // return <ActiveTab users={users} />;

  switch (activeTab) {
    case "usersTable":
      return <UsersTable users={users} />;

    case "pending":
      return <ComingSoon />;

    case "lockedAccounts":
      return <ComingSoon />;

    case "securityEvents":
      return <ComingSoon />;

    default:
      return <UsersTable users={users} />;
  }
}
