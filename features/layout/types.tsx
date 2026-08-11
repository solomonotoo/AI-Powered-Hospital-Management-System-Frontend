import { LucideIcon } from "lucide-react";

// export interface SidebarSubItem {
//   title: string;
//   url: string;
// }

// export type SidebarMenu =
//   | {
//       title: string;
//       icon: LucideIcon;
//       url: string;
//       items?: never;
//     }
//   | { title: string; icon: LucideIcon; url: never; items?: SidebarSubItem[] };

// export interface SidebarSection {
//   group: string;
//   menus: SidebarMenu[];
// }

export type UserRole =
  | "admin"
  | "super_admin"
  | "receptionist"
  | "doctor"
  | "nurse"
  | "lab_technician"
  | "radiologist"
  | "pharmacist"
  | "theater_staff"
  | "emergency_staff"
  | "department_head"
  | "inventory_manager"
  | "accountant"
  | "hr_manager"
  | "analyst";