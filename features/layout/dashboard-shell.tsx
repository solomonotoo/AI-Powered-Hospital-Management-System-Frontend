import { cookies } from "next/headers";

import { AppSidebar } from "@/features/layout/app-sidebar";
import { AppNavbar } from "@/features/layout/app-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

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
export async function DashboardShell({ children, title }: DashboardShellProps) {
  const cookieStore = await cookies();
  const savedState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = savedState ? savedState === "true" : false;

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <AppNavbar title={title} />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 bg-blue-100/20">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
