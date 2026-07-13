
export const sidebarItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Patients",
      icon: Users,
      items: [
        {
          title: "All Patients",
          url: "/patients",
        },
        {
          title: "Register Patient",
          url: "/patients/new",
        },
        {
          title: "Patient Visits",
          url: "/patients/visits",
        },
        {
          title: "Medical Records",
          url: "/patients/records",
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
        },
        {
          title: "Add Doctor",
          url: "/doctors/new",
        },
        {
          title: "Schedules",
          url: "/doctors/schedules",
        },
        {
          title: "Departments",
          url: "/departments",
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
        },
        {
          title: "Schedule Appointment",
          url: "/appointments/new",
        },
        {
          title: "Calendar",
          url: "/appointments/calendar",
        },
      ],
    },
    {
      title: "Admissions",
      icon: Bed,
      items: [
        {
          title: "Current Patients",
          url: "/admissions",
        },
        {
          title: "New Admission",
          url: "/admissions/new",
        },
        {
          title: "Discharges",
          url: "/admissions/discharges",
        },
        {
          title: "Ward Management",
          url: "/wards",
        },
      ],
    },
    {
      title: "Pharmacy",
      icon: Pill,
      items: [
        {
          title: "Medicines",
          url: "/pharmacy/medicines",
        },
        {
          title: "Prescriptions",
          url: "/pharmacy/prescriptions",
        },
        {
          title: "Inventory",
          url: "/pharmacy/inventory",
        },
      ],
    },
    {
      title: "Laboratory",
      icon: FlaskConical,
      items: [
        {
          title: "Lab Tests",
          url: "/laboratory/tests",
        },
        {
          title: "Results",
          url: "/laboratory/results",
        },
        {
          title: "Requests",
          url: "/laboratory/requests",
        },
      ],
    },
    {
      title: "Billing",
      icon: Receipt,
      items: [
        {
          title: "Invoices",
          url: "/billing/invoices",
        },
        {
          title: "Payments",
          url: "/billing/payments",
        },
        {
          title: "Insurance Claims",
          url: "/billing/insurance",
        },
      ],
    },
    {
      title: "Reports",
      icon: BarChart3,
      items: [
        {
          title: "Patient Reports",
          url: "/reports/patients",
        },
        {
          title: "Financial Reports",
          url: "/reports/finance",
        },
        {
          title: "Appointments Report",
          url: "/reports/appointments",
        },
      ],
    },
    {
      title: "Users",
      icon: ShieldCheck,
      items: [
        {
          title: "Staff",
          url: "/users/staff",
        },
        {
          title: "Roles & Permissions",
          url: "/users/roles",
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
        },
        {
          title: "Departments",
          url: "/settings/departments",
        },
        {
          title: "System Settings",
          url: "/settings/system",
        },
      ],
    },
  ];
//=================================


🏠 Dashboard

👥 Patients
    ├── All Patients
    ├── Register Patient
    ├── Patient Visits
    └── Medical Records

🩺 Doctors
    ├── All Doctors
    ├── Add Doctor
    ├── Schedules
    └── Departments

📅 Appointments
    ├── All Appointments
    ├── Schedule Appointment
    └── Calendar

🛏 Admissions
    ├── Current Patients
    ├── New Admission
    ├── Discharges
    └── Ward Management

💊 Pharmacy
    ├── Medicines
    ├── Prescriptions
    └── Inventory

🧪 Laboratory
    ├── Lab Tests
    ├── Results
    └── Requests

💵 Billing
    ├── Invoices
    ├── Payments
    └── Insurance Claims

📊 Reports
    ├── Patient Reports
    ├── Financial Reports
    └── Appointment Reports

👤 Users
    ├── Staff
    └── Roles & Permissions

⚙️ Settings
    ├── Hospital Information
    ├── Departments
    └── System Settings