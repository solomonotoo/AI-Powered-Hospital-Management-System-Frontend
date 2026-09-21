import { SidebarSection } from "@/features/layout/sidebar-types";
import {
  Activity,
  BarChart3,
  Bed,
  Boxes,
  CalendarDays,
  FlaskConical,
  Hospital,
  LayoutDashboard,
  Pill,
  Radiation,
  Receipt,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserCog,
  Users,
} from "lucide-react";

/* =========================================================
   SIDEBAR NAVIGATION ITEMS (PBAC - Permission-Based Access Control)
   ========================================================= */

export const sidebarItems: SidebarSection[] = [
  {
    group: "",
    menus: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard, // Everyone can access
      },
    ],
  },
  {
    group: "",
    menus: [
      {
        title: "Facility",
        url: "/facility",
        icon: Hospital,
        // [FEATURE REFERENCE]: Permission check for Hospital Facility overview and configurations
        requiredPermissions: ["FACILITY_READ", "FACILITY_MANAGE"],
      },
    ],
  },

  {
    // Care delivery: patients, the doctors/appointments that schedule
    // around them, and the three care settings they move through (OPD,
    // IPD, theater). Doctors and Appointments stay separate from
    // OPD/IPD rather than folded into them, because both are resources
    // used across *all* care settings, not just opd.
    group: "Clinical",
    menus: [
      {
        title: "Patients",
        icon: Users,
        items: [
          {
            title: "All Patients",
            url: "/patients",
            // [FEATURE REFERENCE]: Requires patient read access to view patient directory
            requiredPermissions: ["PATIENT_READ"],
          },
          {
            title: "Register Patient",
            url: "/patients/register",
            // [FEATURE REFERENCE]: Requires patient write access to enroll new patients
            requiredPermissions: ["PATIENT_WRITE"],
          },
          {
            title: "Medical Records",
            url: "/patients/records",
            // [FEATURE REFERENCE]: Requires patient read access to inspect medical histories
            requiredPermissions: ["PATIENT_READ"],
          },
        ],
      },

      {
        title: "Visits",
        icon: Activity,
        items: [
          {
            title: "Active Visits",
            url: "/visits/active",
            // [FEATURE REFERENCE]: Requires patient read access to track ongoing visits
            requiredPermissions: ["PATIENT_READ"],
          },
          {
            title: "Visit History",
            url: "/visits/history",
            // [FEATURE REFERENCE]: Requires patient read access to browse past clinical visits
            requiredPermissions: ["PATIENT_READ"],
          },
          {
            title: "Search Visits",
            url: "/visits/search",
            // [FEATURE REFERENCE]: Requires patient read access to search and query visits
            requiredPermissions: ["PATIENT_READ"],
          },
        ],
      },

      {
        title: "Doctors",
        icon: Stethoscope,
        items: [
          {
            title: "All Doctors",
            url: "/doctors",
            requiredPermissions: ["DOCTOR_READ"],
          },
          {
            title: "Add Doctor",
            url: "/doctors/new",
            requiredPermissions: ["DOCTOR_WRITE", "DOCTOR_MANAGE"],
          },
          {
            title: "Schedules",
            url: "/doctors/schedules",
            requiredPermissions: ["DOCTOR_READ"],
          },
          {
            title: "Departments",
            url: "/departments",
            requiredPermissions: ["DEPARTMENT_READ"],
          },
        ],
      },

      {
        title: "Appointments",
        icon: CalendarDays,
        items: [
          {
            title: "All Appointments",
            url: "/appointments",
            requiredPermissions: ["APPOINTMENT_READ"],
          },
          {
            title: "Schedule Appointment",
            url: "/appointments/new",
            requiredPermissions: ["APPOINTMENT_WRITE"],
          },
          {
            title: "Calendar",
            url: "/appointments/calendar",
            requiredPermissions: ["APPOINTMENT_READ"],
          },
        ],
      },

      {
        title: "OPD",
        icon: Stethoscope,
        items: [
          {
            title: "Today's Queue",
            url: "/opd/queue",
            requiredPermissions: ["OPD_READ"],
          },
          {
            title: "New OPD Visit",
            url: "/opd/visits",
            requiredPermissions: ["OPD_WRITE"],
          },
          {
            title: "Consultations",
            url: "/opd/consultations",
            requiredPermissions: ["OPD_READ", "CONSULTATION_READ"],
          },
          {
            title: "Triage",
            url: "/opd/triage",
            requiredPermissions: ["OPD_READ", "TRIAGE_READ"],
          },
          {
            title: "Completed Visits",
            url: "/opd/completed-visits",
            requiredPermissions: ["OPD_READ"],
          },
        ],
      },

      {
        title: "IPD & Beds",
        icon: Bed,
        items: [
          {
            title: "New Admission",
            url: "/ipd/new",
            requiredPermissions: ["IPD_WRITE"],
          },
          {
            title: "Current Admissions",
            url: "/ipd",
            requiredPermissions: ["IPD_READ"],
          },
          {
            title: "Transfers",
            url: "/transfers",
            requiredPermissions: ["IPD_WRITE"],
          },
          {
            title: "Discharges",
            url: "/ipd/discharges",
            requiredPermissions: ["IPD_WRITE"],
          },
          {
            title: "Ward & Bed Management",
            url: "/wards",
            requiredPermissions: ["IPD_READ", "BED_MANAGE"],
          },
        ],
      },

      {
        title: "Accident & Emergency",
        icon: Activity,
        items: [
          {
            title: "New Emergency Visit",
            url: "/emergency/visits/new",
            requiredPermissions: ["EMERGENCY_WRITE"],
          },
          {
            title: "Waiting Patients",
            url: "/emergency/waiting",
            requiredPermissions: ["EMERGENCY_READ"],
          },
          {
            title: "Triage",
            url: "/emergency/triage",
            requiredPermissions: ["EMERGENCY_READ"],
          },
          {
            title: "Treatment",
            url: "/emergency/treatment",
            requiredPermissions: ["EMERGENCY_READ"],
          },
          {
            title: "Observation",
            url: "/emergency/observation",
            requiredPermissions: ["EMERGENCY_READ"],
          },
        ],
      },

      {
        title: "Operation Theater",
        icon: Activity,
        items: [
          {
            title: "Theater Schedule",
            url: "/theater/schedule",
            requiredPermissions: ["THEATER_READ"],
          },
          {
            title: "Ongoing Surgeries",
            url: "/theater/ongoing",
            requiredPermissions: ["THEATER_READ"],
          },
          {
            title: "Post-Op Recovery",
            url: "/theater/recovery",
            requiredPermissions: ["THEATER_READ"],
          },
        ],
      },
    ],
  },

  /* =======================================================
    DIAGNOSTICS
    ======================================================= */

  {
    // Tests/imaging that produce clinical results. Pharmacy used to sit
    // here but has been pulled into its own group — dispensing isn't a
    // diagnostic act, it's a treatment workflow.
    group: "Diagnostics",
    menus: [
      {
        title: "Laboratory",
        icon: FlaskConical,
        items: [
          {
            title: "Lab Tests",
            url: "/laboratory/tests",
            requiredPermissions: ["LAB_READ"],
          },
          {
            title: "Results",
            url: "/laboratory/results",
            requiredPermissions: ["LAB_READ"],
          },
          {
            title: "Requests",
            url: "/laboratory/requests",
            requiredPermissions: ["LAB_READ"],
          },
        ],
      },

      {
        title: "Radiology",
        icon: Radiation,
        items: [
          {
            title: "Imaging Requests",
            url: "/radiology/requests",
            requiredPermissions: ["RADIOLOGY_READ"],
          },
          {
            title: "Reports",
            url: "/radiology/reports",
            requiredPermissions: ["RADIOLOGY_READ"],
          },
        ],
      },
    ],
  },

  /* =======================================================
    PHARMACY
    ======================================================= */

  {
    // Its own group: prescriptions tie directly to patient care
    // (clinical-adjacent), but the workflow — dispensing, stock,
    // refills — is distinct enough from both Diagnostics and general
    // facility Operations to warrant separation.
    group: "Pharmacy",
    menus: [
      {
        title: "Pharmacy",
        icon: Pill,
        items: [
          {
            title: "Dashboard",
            url: "/pharmacy",
            requiredPermissions: ["PHARMACY_READ"],
          },
          {
            title: "Medicines",
            url: "/pharmacy/medicines",
            requiredPermissions: ["PHARMACY_READ"],
          },
          {
            title: "Prescriptions",
            url: "/pharmacy/prescriptions",
            requiredPermissions: ["PHARMACY_READ"],
          },
          {
            title: "Inventory",
            url: "/pharmacy/inventory",
            requiredPermissions: ["PHARMACY_READ", "PHARMACY_MANAGE"],
          },
        ],
      },
    ],
  },

  /* =======================================================
    OPERATIONS
    ======================================================= */

  {
    // Running the building day to day: who's on shift, what supplies
    // are on hand. Higher-frequency than Administration, and used by a
    // different persona (operational/ward manager, not system admin).
    group: "Operations",
    menus: [
      {
        title: "Staff",
        icon: UserCog,
        items: [
          {
            title: "All Staff",
            url: "/staff",
            // [FEATURE REFERENCE]: Requires staff permissions to view active staff directory
            requiredPermissions: ["STAFF_READ", "STAFF_MANAGE"],
          },
          {
            title: "Shift Schedules",
            url: "/staff/schedules",
            // [FEATURE REFERENCE]: Requires staff permissions to view or update duty schedules
            requiredPermissions: ["STAFF_READ", "STAFF_MANAGE"],
          },
          {
            title: "Attendance",
            url: "/staff/attendance",
            // [FEATURE REFERENCE]: Requires staff permissions to track staff clock-in/out logs
            requiredPermissions: ["STAFF_READ", "STAFF_MANAGE"],
          },
        ],
      },

      {
        title: "Inventory",
        icon: Boxes,
        items: [
          {
            title: "Supplies",
            url: "/inventory/supplies",
            requiredPermissions: ["INVENTORY_READ"],
          },
          {
            title: "Equipment",
            url: "/inventory/equipment",
            requiredPermissions: ["INVENTORY_READ"],
          },
          {
            title: "Stock Requests",
            url: "/inventory/requests",
            requiredPermissions: ["INVENTORY_READ", "INVENTORY_MANAGE"],
          },
        ],
      },
    ],
  },

  /* =======================================================
   FINANCE & INSIGHTS
   ======================================================= */

  {
    group: "Finance & Insights",
    menus: [
      {
        title: "Billing",
        icon: Receipt,
        items: [
          {
            title: "Invoices",
            url: "/billing/invoices",
            // [FEATURE REFERENCE]: Requires billing permissions to generate and review invoices
            requiredPermissions: ["BILLING_READ", "BILLING_MANAGE"],
          },
          {
            title: "Payments",
            url: "/billing/payments",
            // [FEATURE REFERENCE]: Requires billing permissions to view and process transactions
            requiredPermissions: ["BILLING_READ", "BILLING_MANAGE"],
          },
          {
            title: "Insurance Claims",
            url: "/billing/insurance",
            // [FEATURE REFERENCE]: Requires billing permissions to manage third-party insurance claims
            requiredPermissions: ["BILLING_READ", "BILLING_MANAGE"],
          },
        ],
      },

      {
        title: "Analytics",
        icon: BarChart3,
        items: [
          {
            title: "Patient Reports",
            url: "/analytics/patients",
            requiredPermissions: ["ANALYTICS_READ"],
          },
          {
            title: "Financial Reports",
            url: "/analytics/finance",
            requiredPermissions: ["ANALYTICS_READ"],
          },
          {
            title: "Appointments Report",
            url: "/analytics/appointments",
            requiredPermissions: ["ANALYTICS_READ"],
          },
        ],
      },
    ],
  },

  /* =======================================================
   ADMINISTRATION
   ======================================================= */

  {
    // System/policy configuration only — low-frequency, admin-user-only.
    // Staff roster moved out to Operations; this keeps Roles &
    // Permissions and Settings, which are genuinely administrative.
    group: "Administration",
    menus: [
      {
        title: "Users & Roles",
        icon: ShieldCheck,
        items: [
          {
            title: "User Accounts",
            url: "/users",
            // [FEATURE REFERENCE]: Requires user management permission to manage user directory & statuses
            requiredPermissions: ["USER_MANAGE"],
          },
          {
            title: "Roles & Permissions",
            url: "/users/roles",
            // [FEATURE REFERENCE]: Requires role management permission to create and configure roles
            requiredPermissions: ["ROLE_MANAGE"],
          },
        ],
      },

      {
        title: "Settings",
        icon: Settings,
        items: [
          {
            title: "Hospital Information",
            url: "/settings/hospital",
            requiredPermissions: ["SETTINGS_MANAGE"],
          },
          {
            title: "Departments",
            url: "/settings/departments",
            requiredPermissions: ["SETTINGS_MANAGE", "DEPARTMENT_READ"],
          },
          {
            title: "System Settings",
            url: "/settings/system",
            requiredPermissions: ["SYSTEM_MANAGE"],
          },
        ],
      },
    ],
  },
];
