import { cookies } from "next/headers";

import { AppSidebar } from "@/features/layout/app-sidebar";
import { AppNavbar } from "@/features/layout/app-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardShellClient } from "./dashboardShellClient";

interface DashboardShellProps {
  children: React.ReactNode;
  /** Optional section title shown in the navbar, e.g. "Patients" */
  title?: string;
}

/**
 * Shared shell for every authenticated HMS screen.
 *
 * - TooltipProvider wraps everything because SidebarMenuButton's `tooltip`
 *   prop (used for labels when the sidebar is collapsed to its icon rail)
 *   renders a shadcn Tooltip internally, which throws without a provider
 *   above it in the tree.
 * - defaultOpen reads the persisted cookie so the sidebar doesn't flash
 *   between expanded/collapsed on reload. No saved preference yet defaults
 *   to collapsed (icon rail) — a safer default for tablet/ward-station use
 *   than fully expanded, while desktop users who prefer it open just need
 *   to toggle it once and it's remembered from then on.
 */

//server component wrapper
export async function DashboardShell({ children, title }: DashboardShellProps) {
  const cookieStore = await cookies();
  const savedState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = savedState ? savedState === "true" : false;

  return (
    <DashboardShellClient defaultOpen={defaultOpen} title={title}>
      {children}
    </DashboardShellClient>
  );
}
