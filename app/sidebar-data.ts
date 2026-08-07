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

export const sidebarItems: SidebarSection[] = [
  {
    group: "",
    menus: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
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
          { title: "All Patients", url: "/patients" },
          { title: "Register Patient", url: "/patients/register" },
          { title: "Medical Records", url: "/patients/records" },
        ],
      },
      {
        title: "Visits",
        icon: Users,
        items: [
          { title: "Active Visits", url: "/patients" },
          { title: "Visit history", url: "/patients/register" },
          { title: "Search Visits", url: "/patients/records" },
        ],
      },
      {
        title: "Doctors",
        icon: Stethoscope,
        items: [
          { title: "All Doctors", url: "/doctors" },
          { title: "Add Doctor", url: "/doctors/new" },
          { title: "Schedules", url: "/doctors/schedules" },
          { title: "Departments", url: "/departments" },
        ],
      },
      {
        title: "Appointments",
        icon: CalendarDays,
        items: [
          { title: "All Appointments", url: "/appointments" },
          { title: "Schedule Appointment", url: "/appointments/new" },
          { title: "Calendar", url: "/appointments/calendar" },
        ],
      },
      {
        title: "OPD",
        icon: Stethoscope,
        items: [
          { title: "Today's Queue", url: "/opd/queue" },
          { title: "New OPD Visit", url: "/opd/visits" },
          { title: "Consultations", url: "/opd/consultations" },
          { title: "Triage", url: "/opd/triage" },
          { title: "Completed Visits", url: "/opd/completed-visit" },
        ],
      },
      {
        title: "IPD & Beds",
        icon: Bed,
        items: [
          { title: "New Admission", url: "/ipd/new" },
          { title: "Current Admissions", url: "/ipd" },
          { title: "Transfers", url: "/transfers" },
          { title: "Discharges", url: "/ipd/discharges" },
          { title: "Ward & Bed Management", url: "/wards" },
        ],
      },
      {
        title: "Accident & Emergency",
        icon: Activity,
        items: [
          { title: "New Emergency Visit", url: "/theater/schedule" },
          { title: "Waiting Patients", url: "/theater/ongoing" },
          { title: "Triage", url: "/theater/recovery" },
          { title: "Treatment", url: "/theater/recovery" },
          { title: "Observation", url: "/theater/recovery" },
        ],
      },
      {
        title: "Operation Theater",
        icon: Activity,
        items: [
          { title: "Theater Schedule", url: "/theater/schedule" },
          { title: "Ongoing Surgeries", url: "/theater/ongoing" },
          { title: "Post-Op Recovery", url: "/theater/recovery" },
        ],
      },
    ],
  },

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
          { title: "Lab Tests", url: "/laboratory/tests" },
          { title: "Results", url: "/laboratory/results" },
          { title: "Requests", url: "/laboratory/requests" },
        ],
      },
      {
        title: "Radiology",
        icon: Radiation,
        items: [
          { title: "Imaging Requests", url: "/radiology/requests" },
          { title: "Reports", url: "/radiology/reports" },
        ],
      },
    ],
  },

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
          { title: "Dashboard", url: "/pharmacy" },
          { title: "Medicines", url: "/pharmacy/medicines" },
          { title: "Prescriptions", url: "/pharmacy/prescriptions" },
          { title: "Inventory", url: "/pharmacy/inventory" },
        ],
      },
    ],
  },

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
          { title: "All Staff", url: "/staff" },
          { title: "Shift Schedules", url: "/staff/schedules" },
          { title: "Attendance", url: "/staff/attendance" },
        ],
      },
      {
        title: "Inventory",
        icon: Boxes,
        items: [
          { title: "Supplies", url: "/inventory/supplies" },
          { title: "Equipment", url: "/inventory/equipment" },
          { title: "Stock Requests", url: "/inventory/requests" },
        ],
      },
    ],
  },

  {
    group: "Finance & Insights",
    menus: [
      {
        title: "Billing",
        icon: Receipt,
        items: [
          { title: "Invoices", url: "/billing/invoices" },
          { title: "Payments", url: "/billing/payments" },
          { title: "Insurance Claims", url: "/billing/insurance" },
        ],
      },
      {
        title: "Analytics",
        icon: BarChart3,
        items: [
          { title: "Patient Reports", url: "/analytics/patients" },
          { title: "Financial Reports", url: "/analytics/finance" },
          { title: "Appointments Report", url: "/analytics/appointments" },
        ],
      },
    ],
  },

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
          { title: "User Accounts", url: "/users" },
          { title: "Roles & Permissions", url: "/users/roles" },
        ],
      },
      {
        title: "Settings",
        icon: Settings,
        items: [
          { title: "Hospital Information", url: "/settings/hospital" },
          { title: "Departments", url: "/settings/departments" },
          { title: "System Settings", url: "/settings/system" },
        ],
      },
    ],
  },
];
