import { DashboardShell } from "@/features/layout/dashboard-shell";
import type { SidebarUser } from "@/features/layout/app-sidebar";

// Replace with your real auth/session lookup.
const MOCK_USER: SidebarUser = {
  name: "Dr. Akosua Mensah",
  role: "Attending Physician",
  initials: "AM",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell user={MOCK_USER}>{children}</DashboardShell>;
}
