import { Shield, Users, FileText, Database, Calendar } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  color: string;
  status: "active" | "inactive";
}

interface UserProfileAssignRoleProps {
  userId?: string;
  onClose?: () => void;
  onAssign?: (roleId: string, permissions: string[]) => void;
}

// Mock roles data
export const userRoles = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    users: 5,
    permissions: ["all"],
    color: "bg-purple-500",
    status: "active" as const,
    assignedAt: "Jan 15, 2026",
  },
  {
    id: "doctor",
    name: "Doctor",
    description: "Medical professional with patient access",
    users: 28,
    permissions: ["read", "write", "delete"],
    color: "bg-blue-500",
    status: "active" as const,
    assignedAt: "Jan 15, 2026",
  },
  {
    id: "nurse",
    name: "Nurse",
    description: "Healthcare provider with limited access",
    users: 42,
    permissions: ["read", "write"],
    color: "bg-emerald-500",
    status: "active" as const,
    assignedAt: "-",
  },
  {
    id: "receptionist",
    name: "Receptionist",
    description: "Front desk staff with scheduling access",
    users: 12,
    permissions: ["read"],
    color: "bg-amber-500",
    status: "active" as const,
    assignedAt: "-",
  },
];

// Mock permissions grouped by category
export const UserPermissionCategories = [
  {
    id: "patient",
    name: "Patient Management",
    icon: Users,
    permissions: [
      {
        id: "patient_read",
        name: "View Patients",
        description: "View patient profiles and records",
        checked: false,
      },
      {
        id: "patient_write",
        name: "Create/Edit Patients",
        description: "Create new patient records and edit existing ones",
        checked: false,
      },
      {
        id: "patient_delete",
        name: "Delete Patients",
        description: "Permanently delete patient records",
        checked: false,
      },
      {
        id: "patient_export",
        name: "Export Patient Data",
        description: "Export patient data to external formats",
        checked: false,
      },
    ],
  },
  {
    id: "appointments",
    name: "Appointments",
    icon: Calendar,
    permissions: [
      {
        id: "appt_read",
        name: "View Appointments",
        description: "View all appointments and schedules",
        checked: false,
      },
      {
        id: "appt_write",
        name: "Create/Edit Appointments",
        description: "Schedule and modify appointments",
        checked: false,
      },
      {
        id: "appt_cancel",
        name: "Cancel Appointments",
        description: "Cancel appointments",
        checked: false,
      },
    ],
  },
  {
    id: "medical",
    name: "Medical Records",
    icon: FileText,
    permissions: [
      {
        id: "medical_read",
        name: "View Medical Records",
        description: "Access patient medical history",
        checked: false,
      },
      {
        id: "medical_write",
        name: "Create/Edit Medical Records",
        description: "Add and update medical records",
        checked: false,
      },
      {
        id: "medical_delete",
        name: "Delete Medical Records",
        description: "Delete medical records",
        checked: false,
      },
    ],
  },
  {
    id: "billing",
    name: "Billing & Payments",
    icon: Database,
    permissions: [
      {
        id: "billing_read",
        name: "View Billing",
        description: "View billing information",
        checked: false,
      },
      {
        id: "billing_write",
        name: "Create Invoices",
        description: "Create and send invoices",
        checked: false,
      },
      {
        id: "billing_delete",
        name: "Delete Invoices",
        description: "Delete invoices",
        checked: false,
      },
    ],
  },
  {
    id: "admin",
    name: "Administration",
    icon: Shield,
    permissions: [
      {
        id: "admin_users",
        name: "Manage Users",
        description: "Add, edit, and delete users",
        checked: false,
      },
      {
        id: "admin_roles",
        name: "Manage Roles",
        description: "Create and modify roles",
        checked: false,
      },
      {
        id: "admin_settings",
        name: "System Settings",
        description: "Access and modify system settings",
        checked: false,
      },
      {
        id: "admin_logs",
        name: "View Audit Logs",
        description: "Access audit trail and logs",
        checked: false,
      },
    ],
  },
];
