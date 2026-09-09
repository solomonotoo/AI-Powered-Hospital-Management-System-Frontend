import { SidebarSection } from "@/features/layout/sidebar-types";
import { UserRole } from "@/features/layout/types";
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
   ROLE GROUPS
   ========================================================= */

const allRoles: UserRole[] = [
  "admin",
  "super_admin",
  "receptionist",
  "doctor",
  "nurse",
  "lab_technician",
  "radiologist",
  "pharmacist",
  "theater_staff",
  "emergency_staff",
  "department_head",
  "inventory_manager",
  "accountant",
  "hr_manager",
  "analyst",
];

/* =========================================================
   PATIENTS
   ========================================================= */

const allowedPatientRoles: UserRole[] = [
  "admin",
  "super_admin",
  "receptionist",
  "doctor",
  "nurse",
  "lab_technician",
  "radiologist",
  "pharmacist",
  "theater_staff",
  "emergency_staff",
  "department_head",
];

const allowedPatientRegistrationRoles: UserRole[] = [
  "admin",
  "super_admin",
  "receptionist",
  "nurse",
  "emergency_staff",
];

const allowedMedicalRecordsRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "department_head",
  "theater_staff",
  "emergency_staff",
];

/* =========================================================
   VISITS
   ========================================================= */

const allowedVisitRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
  "department_head",
  "theater_staff",
  "emergency_staff",
];

const allowedVisitHistoryRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "department_head",
  "emergency_staff",
  "theater_staff",
];

const allowedVisitSearchRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
  "department_head",
];

/* =========================================================
   DOCTORS
   ========================================================= */

const allowedDoctorViewRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
  "department_head",
];

const allowedDoctorManagementRoles: UserRole[] = ["admin", "super_admin"];

const allowedDoctorScheduleRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "receptionist",
  "department_head",
];

const allowedDepartmentRoles: UserRole[] = [
  "admin",
  "super_admin",
  "department_head",
];

/* =========================================================
   APPOINTMENTS
   ========================================================= */

const allowedAppointmentRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
  "department_head",
];

const allowedScheduleAppointmentRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
];

/* =========================================================
   OPD
   ========================================================= */

const allowedOpdRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
  "department_head",
];

const allowedOpdQueueRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
  "department_head",
];

const allowedOpdVisitRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
];

const allowedConsultationRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "department_head",
];

const allowedTriageRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "emergency_staff",
];

const allowedCompletedVisitRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "department_head",
];

/* =========================================================
   IPD & BEDS
   ========================================================= */

const allowedIpdRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "department_head",
];

const allowedAdmissionRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
];

const allowedTransferRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "department_head",
];

const allowedDischargeRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
];

const allowedBedManagementRoles: UserRole[] = [
  "admin",
  "super_admin",
  "nurse",
  "department_head",
];

/* =========================================================
   ACCIDENT & EMERGENCY
   ========================================================= */

const allowedEmergencyRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "emergency_staff",
  "department_head",
];

const allowedEmergencyRegistrationRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "receptionist",
  "emergency_staff",
];

const allowedEmergencyClinicalRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "emergency_staff",
];

/* =========================================================
   OPERATION THEATER
   ========================================================= */

const allowedTheaterRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "theater_staff",
  "department_head",
];

const allowedTheaterClinicalRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "theater_staff",
];

/* =========================================================
   LABORATORY
   ========================================================= */

const allowedLaboratoryRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "lab_technician",
];

const allowedLabRequestRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "lab_technician",
  "department_head",
];

const allowedLabResultRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "lab_technician",
];

/* =========================================================
   RADIOLOGY
   ========================================================= */

const allowedRadiologyRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "radiologist",
];

const allowedImagingRequestRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "radiologist",
];

const allowedRadiologyReportRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "radiologist",
  "department_head",
];

/* =========================================================
   PHARMACY
   ========================================================= */

const allowedPharmacyRoles: UserRole[] = ["admin", "super_admin", "pharmacist"];

const allowedPrescriptionRoles: UserRole[] = [
  "admin",
  "super_admin",
  "doctor",
  "nurse",
  "pharmacist",
];

const allowedPharmacyInventoryRoles: UserRole[] = [
  "admin",
  "super_admin",
  "pharmacist",
  "inventory_manager",
];

/* =========================================================
   STAFF
   ========================================================= */

const allowedStaffManagementRoles: UserRole[] = [
  "admin",
  "super_admin",
  "hr_manager",
  "department_head",
];

const allowedShiftScheduleRoles: UserRole[] = [
  "admin",
  "super_admin",
  "hr_manager",
  "department_head",
  "nurse",
];

const allowedAttendanceRoles: UserRole[] = [
  "admin",
  "super_admin",
  "hr_manager",
  "department_head",
];

/* =========================================================
   INVENTORY
   ========================================================= */

const allowedInventoryRoles: UserRole[] = [
  "admin",
  "super_admin",
  "inventory_manager",
];

const allowedStockRequestRoles: UserRole[] = [
  "admin",
  "super_admin",
  "inventory_manager",
  "department_head",
  "nurse",
];

/* =========================================================
   BILLING
   ========================================================= */

const allowedBillingRoles: UserRole[] = [
  "admin",
  "super_admin",
  "accountant",
  "receptionist",
];

const allowedInsuranceRoles: UserRole[] = [
  "admin",
  "super_admin",
  "accountant",
];

/* =========================================================
   ANALYTICS
   ========================================================= */

const allowedPatientAnalyticsRoles: UserRole[] = [
  "admin",
  "super_admin",
  "department_head",
  "analyst",
];

const allowedFinancialAnalyticsRoles: UserRole[] = [
  "admin",
  "super_admin",
  "accountant",
  "analyst",
];

const allowedAppointmentAnalyticsRoles: UserRole[] = [
  "admin",
  "super_admin",
  "department_head",
  "analyst",
  "receptionist",
];

/* =========================================================
   ADMINISTRATION
   ========================================================= */

const allowedUserManagementRoles: UserRole[] = ["admin", "super_admin"];

const allowedRoleManagementRoles: UserRole[] = ["super_admin"];

const allowedHospitalSettingsRoles: UserRole[] = ["admin", "super_admin"];

const allowedSystemSettingsRoles: UserRole[] = ["super_admin"];

/* =========================================================
   SIDEBAR
   ========================================================= */

export const sidebarItems: SidebarSection[] = [
  {
    group: "",
    menus: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard, //Everyone can access
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
        allowedRoles: ["admin", "super_admin"],
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
            allowedRoles: allowedPatientRoles,
            // [FEATURE REFERENCE]: Requires patient read access to view patient directory
            requiredPermissions: ["PATIENT_READ"],
          },
          {
            title: "Register Patient",
            url: "/patients/register",
            allowedRoles: allowedPatientRegistrationRoles,
            // [FEATURE REFERENCE]: Requires patient write access to enroll new patients
            requiredPermissions: ["PATIENT_WRITE"],
          },
          {
            title: "Medical Records",
            url: "/patients/records",
            allowedRoles: allowedMedicalRecordsRoles,
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
            allowedRoles: allowedVisitRoles,
            // [FEATURE REFERENCE]: Requires patient read access to track ongoing visits
            requiredPermissions: ["PATIENT_READ"],
          },
          {
            title: "Visit History",
            url: "/visits/history",
            allowedRoles: allowedVisitHistoryRoles,
            // [FEATURE REFERENCE]: Requires patient read access to browse past clinical visits
            requiredPermissions: ["PATIENT_READ"],
          },
          {
            title: "Search Visits",
            url: "/visits/search",
            allowedRoles: allowedVisitSearchRoles,
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
            allowedRoles: allowedDoctorViewRoles,
          },
          {
            title: "Add Doctor",
            url: "/doctors/new",
            allowedRoles: allowedDoctorManagementRoles,
          },
          {
            title: "Schedules",
            url: "/doctors/schedules",
            allowedRoles: allowedDoctorScheduleRoles,
          },
          {
            title: "Departments",
            url: "/departments",
            allowedRoles: allowedDepartmentRoles,
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
            allowedRoles: allowedAppointmentRoles,
          },
          {
            title: "Schedule Appointment",
            url: "/appointments/new",
            allowedRoles: allowedScheduleAppointmentRoles,
          },
          {
            title: "Calendar",
            url: "/appointments/calendar",
            allowedRoles: allowedAppointmentRoles,
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
            allowedRoles: allowedOpdQueueRoles,
          },
          {
            title: "New OPD Visit",
            url: "/opd/visits",
            allowedRoles: allowedOpdVisitRoles,
          },
          {
            title: "Consultations",
            url: "/opd/consultations",
            allowedRoles: allowedConsultationRoles,
          },
          {
            title: "Triage",
            url: "/opd/triage",
            allowedRoles: allowedTriageRoles,
          },
          {
            title: "Completed Visits",
            url: "/opd/completed-visits",
            allowedRoles: allowedCompletedVisitRoles,
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
            allowedRoles: allowedAdmissionRoles,
          },
          {
            title: "Current Admissions",
            url: "/ipd",
            allowedRoles: allowedIpdRoles,
          },
          {
            title: "Transfers",
            url: "/transfers",
            allowedRoles: allowedTransferRoles,
          },
          {
            title: "Discharges",
            url: "/ipd/discharges",
            allowedRoles: allowedDischargeRoles,
          },
          {
            title: "Ward & Bed Management",
            url: "/wards",
            allowedRoles: allowedBedManagementRoles,
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
            allowedRoles: allowedEmergencyRegistrationRoles,
          },
          {
            title: "Waiting Patients",
            url: "/emergency/waiting",
            allowedRoles: allowedEmergencyClinicalRoles,
          },
          {
            title: "Triage",
            url: "/emergency/triage",
            allowedRoles: allowedEmergencyClinicalRoles,
          },
          {
            title: "Treatment",
            url: "/emergency/treatment",
            allowedRoles: allowedEmergencyClinicalRoles,
          },
          {
            title: "Observation",
            url: "/emergency/observation",
            allowedRoles: allowedEmergencyClinicalRoles,
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
            allowedRoles: allowedTheaterRoles,
          },
          {
            title: "Ongoing Surgeries",
            url: "/theater/ongoing",
            allowedRoles: allowedTheaterClinicalRoles,
          },
          {
            title: "Post-Op Recovery",
            url: "/theater/recovery",
            allowedRoles: allowedTheaterClinicalRoles,
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
            allowedRoles: allowedLaboratoryRoles,
          },
          {
            title: "Results",
            url: "/laboratory/results",
            allowedRoles: allowedLabResultRoles,
          },
          {
            title: "Requests",
            url: "/laboratory/requests",
            allowedRoles: allowedLabRequestRoles,
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
            allowedRoles: allowedImagingRequestRoles,
          },
          {
            title: "Reports",
            url: "/radiology/reports",
            allowedRoles: allowedRadiologyReportRoles,
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
            allowedRoles: allowedPharmacyRoles,
          },
          {
            title: "Medicines",
            url: "/pharmacy/medicines",
            allowedRoles: allowedPharmacyRoles,
          },
          {
            title: "Prescriptions",
            url: "/pharmacy/prescriptions",
            allowedRoles: allowedPrescriptionRoles,
          },
          {
            title: "Inventory",
            url: "/pharmacy/inventory",
            allowedRoles: allowedPharmacyInventoryRoles,
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
            allowedRoles: allowedStaffManagementRoles,
            // [FEATURE REFERENCE]: Requires staff permissions to view active staff directory
            requiredPermissions: ["STAFF_READ", "STAFF_MANAGE"],
          },
          {
            title: "Shift Schedules",
            url: "/staff/schedules",
            allowedRoles: allowedShiftScheduleRoles,
            // [FEATURE REFERENCE]: Requires staff permissions to view or update duty schedules
            requiredPermissions: ["STAFF_READ", "STAFF_MANAGE"],
          },
          {
            title: "Attendance",
            url: "/staff/attendance",
            allowedRoles: allowedAttendanceRoles,
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
            allowedRoles: allowedInventoryRoles,
          },
          {
            title: "Equipment",
            url: "/inventory/equipment",
            allowedRoles: allowedInventoryRoles,
          },
          {
            title: "Stock Requests",
            url: "/inventory/requests",
            allowedRoles: allowedStockRequestRoles,
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
            allowedRoles: allowedBillingRoles,
            // [FEATURE REFERENCE]: Requires billing permissions to generate and review invoices
            requiredPermissions: ["BILLING_READ", "BILLING_MANAGE"],
          },
          {
            title: "Payments",
            url: "/billing/payments",
            allowedRoles: allowedBillingRoles,
            // [FEATURE REFERENCE]: Requires billing permissions to view and process transactions
            requiredPermissions: ["BILLING_READ", "BILLING_MANAGE"],
          },
          {
            title: "Insurance Claims",
            url: "/billing/insurance",
            allowedRoles: allowedInsuranceRoles,
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
            allowedRoles: allowedPatientAnalyticsRoles,
          },
          {
            title: "Financial Reports",
            url: "/analytics/finance",
            allowedRoles: allowedFinancialAnalyticsRoles,
          },
          {
            title: "Appointments Report",
            url: "/analytics/appointments",
            allowedRoles: allowedAppointmentAnalyticsRoles,
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
            allowedRoles: allowedUserManagementRoles,
            // [FEATURE REFERENCE]: Requires user management permission to manage user directory & statuses
            requiredPermissions: ["USER_MANAGE"],
          },
          {
            title: "Roles & Permissions",
            url: "/users/roles",
            allowedRoles: allowedRoleManagementRoles,
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
            allowedRoles: allowedHospitalSettingsRoles,
          },
          {
            title: "Departments",
            url: "/settings/departments",
            allowedRoles: allowedDepartmentRoles,
          },
          {
            title: "System Settings",
            url: "/settings/system",
            allowedRoles: allowedSystemSettingsRoles,
          },
        ],
      },
    ],
  },
];
