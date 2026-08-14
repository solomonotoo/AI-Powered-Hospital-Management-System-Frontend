import { z } from "zod";
import { Staff } from "./types/staff";

// Address Schema
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

// Emergency Contact Schema
const EmergencyContactSchema = z.object({
  name: z.string(),
  relationship: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
});

// Personal Information Schema
const PersonalInfoSchema = z.object({
  fullName: z.string(),
  gender: z.enum(["Male", "Female", "Non-binary", "Prefer not to say"]),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  photo: z.string().url().optional(),
  nationalId: z.string(),
});

// Contact Information Schema
const ContactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s-]+$/),
  address: AddressSchema,
  emergencyContact: EmergencyContactSchema,
});

// Employment Information Schema
const EmploymentInfoSchema = z.object({
  employeeId: z.string(),
  department: z.enum([
    "Engineering",
    "Sales",
    "Marketing",
    "Human Resources",
    "Finance",
    "Operations",
    "Research & Development",
    "Customer Support",
    "Information Technology",
    "Legal",
  ]),
  position: z.string(),
  role: z.enum([
    "Individual Contributor",
    "Team Lead",
    "Manager",
    "Director",
    "Vice President",
    "Executive",
  ]),
  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Intern",
    "Freelance",
  ]),
  dateJoined: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reportingManager: z.string().optional(),
  employmentStatus: z.enum(["Active", "On Leave", "Terminated", "Probation"]),
});

// System Information Schema
const SystemInfoSchema = z.object({
  userAccount: z.string(),
  systemRole: z.enum(["Admin", "Manager", "User", "Guest", "Super Admin"]),
  accountStatus: z.enum(["Active", "Inactive", "Suspended", "Pending"]),
  lastLogin: z.string().datetime().optional(),
  accessLevel: z.enum(["Read", "Write", "Admin", "Full Access", "Restricted"]),
});

// Main Person Schema
const PersonSchema = z.object({
  id: z.string().uuid(),
  personalInfo: PersonalInfoSchema,
  contactInfo: ContactInfoSchema,
  employmentInfo: EmploymentInfoSchema,
  systemInfo: SystemInfoSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Array Schema for 20 people
const PeopleArraySchema = z.array(PersonSchema);

// Type inference
type Person = z.infer<typeof PersonSchema>;
type PeopleArray = z.infer<typeof PeopleArraySchema>;

export { PersonSchema, PeopleArraySchema, type Person, type PeopleArray };

export const StaffSummaryMock = {
  totalStaff: 20,
  activeStaff: 15,
  inActiveStaff: 3,
  pendingApprovalStaff: 2,
  onDutyStaff: 5,
  onLeaveStaff: 2,
};

export const staffDataMock = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    employeeId: "EMP001",
    firstName: "James",
    lastName: "Smith",
    workEmail: "james.smith@hospital.com",
    phoneNumber: "+1-555-0101",
    role: "DOCTOR",
    department: "CARDIOLOGY",
    employmentDate: "2018-06-15",
    workingHours: "9:00 AM - 5:00 PM",
    specialisation: "Interventional Cardiology",
    licenseNumber: "LIC123456",
    qualifications: "MD, FACC",
    consultationFee: "$250",
    status: true,
    createdAt: "2018-06-01T08:00:00Z",
    updatedAt: "2023-01-10T14:30:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "b7c9d8e0-f1a2-4b3c-8d4e-5f6a7b8c9d0e",
  },
  {
    id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    employeeId: "EMP002",
    firstName: "Mary",
    lastName: "Johnson",
    workEmail: "mary.johnson@hospital.com",
    phoneNumber: "+1-555-0102",
    role: "NURSE",
    department: "EMERGENCY",
    employmentDate: "2019-03-20",
    workingHours: "7:00 AM - 3:00 PM",
    specialisation: "Trauma Nursing",
    licenseNumber: "LIC234567",
    qualifications: "RN, BSN",
    status: true,
    createdAt: "2019-03-01T09:00:00Z",
    updatedAt: "2022-11-05T11:20:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
    employeeId: "EMP003",
    firstName: "Robert",
    lastName: "Williams",
    workEmail: "robert.williams@hospital.com",
    phoneNumber: "+1-555-0103",
    role: "DOCTOR",
    department: "SURGERY",
    employmentDate: "2015-11-01",
    workingHours: "8:00 AM - 6:00 PM",
    specialisation: "Orthopedic Surgery",
    licenseNumber: "LIC345678",
    qualifications: "MD, FACS",
    consultationFee: "$400",
    status: true,
    createdAt: "2015-10-15T10:00:00Z",
    updatedAt: "2023-02-20T16:45:00Z",
    createdBy: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    updatedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
    employeeId: "EMP004",
    firstName: "Patricia",
    lastName: "Brown",
    workEmail: "patricia.brown@hospital.com",
    phoneNumber: "+345538824",
    role: "RADIOLOGIST",
    department: "RADIOLOGY",
    employmentDate: "2020-08-10",
    workingHours: "9:00 AM - 5:00 PM",
    specialisation: "Diagnostic Radiology",
    licenseNumber: "LIC456789",
    qualifications: "MD, DABR",
    consultationFee: "$300",
    status: false,
    endDate: "2023-05-31",
    createdAt: "2020-07-20T07:30:00Z",
    updatedAt: "2023-05-15T13:00:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "b7c9d8e0-f1a2-4b3c-8d4e-5f6a7b8c9d0e",
  },
  {
    id: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
    employeeId: "EMP005",
    firstName: "Michael",
    lastName: "Jones",
    workEmail: "michael.jones@hospital.com",
    phoneNumber: "+1-555-0105",
    role: "PHARMACIST",
    department: "PHARMACY",
    employmentDate: "2017-01-05",
    workingHours: "8:00 AM - 4:00 PM",
    specialisation: "Clinical Pharmacy",
    licenseNumber: "LIC567890",
    qualifications: "PharmD, BCPS",
    status: true,
    createdAt: "2016-12-20T11:00:00Z",
    updatedAt: "2022-09-01T09:15:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
    employeeId: "EMP006",
    firstName: "Linda",
    lastName: "Garcia",
    workEmail: "linda.garcia@hospital.com",
    phoneNumber: "+1-555-0106",
    role: "DOCTOR",
    department: "PEDIATRICS",
    employmentDate: "2019-09-12",
    workingHours: "10:00 AM - 6:00 PM",
    specialisation: "Occupational Therapy",
    licenseNumber: "LIC678901",
    qualifications: "OTR/L",
    consultationFee: "$150",
    status: true,
    createdAt: "2019-08-25T14:00:00Z",
    updatedAt: "2023-03-01T12:00:00Z",
    createdBy: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    updatedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
    employeeId: "EMP007",
    firstName: "William",
    lastName: "Miller",
    workEmail: "william.miller@hospital.com",
    phoneNumber: "+233445567",
    role: "ADMIN",
    department: "PHARMACY",
    employmentDate: "2021-02-01",
    workingHours: "9:00 AM - 5:00 PM",
    qualifications: "MBA, MHA",
    status: true,
    createdAt: "2021-01-15T08:45:00Z",
    updatedAt: "2022-12-20T10:30:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
    employeeId: "EMP008",
    firstName: "Elizabeth",
    lastName: "Davis",
    workEmail: "elizabeth.davis@hospital.com",
    phoneNumber: "+1-555-0108",
    role: "DOCTOR",
    department: "PEDIATRICS",
    employmentDate: "2016-07-19",
    workingHours: "8:30 AM - 4:30 PM",
    specialisation: "Pediatric Cardiology",
    licenseNumber: "LIC789012",
    qualifications: "MD, FAAP",
    consultationFee: "$220",
    status: true,
    createdAt: "2016-07-01T09:00:00Z",
    updatedAt: "2023-01-05T15:00:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "b7c9d8e0-f1a2-4b3c-8d4e-5f6a7b8c9d0e",
  },
  {
    id: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
    employeeId: "EMP009",
    firstName: "David",
    lastName: "Rodriguez",
    workEmail: "david.rodriguez@hospital.com",
    phoneNumber: "+1-555-0109",
    role: "LAB_TECH",
    department: "RADIOLOGY",
    employmentDate: "2020-04-25",
    workingHours: "7:00 AM - 3:00 PM",
    specialisation: "MRI Technician",
    licenseNumber: "LIC890123",
    qualifications: "RT(R)(MR)",
    status: true,
    createdAt: "2020-04-10T13:00:00Z",
    updatedAt: "2022-08-15T11:45:00Z",
    createdBy: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
    employeeId: "EMP010",
    firstName: "Jennifer",
    lastName: "Martinez",
    workEmail: "jennifer.martinez@hospital.com",
    phoneNumber: "+1-555-0110",
    role: "NURSE",
    department: "NEUROLOGY",
    employmentDate: "2018-12-03",
    workingHours: "7:00 PM - 7:00 AM",
    specialisation: "Critical Care Nursing",
    licenseNumber: "LIC901234",
    qualifications: "RN, CCRN",
    status: false,
    endDate: "2023-07-01",
    createdAt: "2018-11-20T16:00:00Z",
    updatedAt: "2023-06-15T09:00:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "b7c9d8e0-f1a2-4b3c-8d4e-5f6a7b8c9d0e",
  },
  {
    id: "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b",
    employeeId: "EMP011",
    firstName: "Richard",
    lastName: "Hernandez",
    workEmail: "richard.hernandez@hospital.com",
    phoneNumber: "+233455698",
    role: "DOCTOR",
    department: "NEUROLOGY",
    employmentDate: "2014-09-22",
    workingHours: "9:00 AM - 6:00 PM",
    specialisation: "Neurology",
    licenseNumber: "LIC012345",
    qualifications: "MD, PhD",
    consultationFee: "$350",
    status: true,
    createdAt: "2014-09-01T08:00:00Z",
    updatedAt: "2023-02-14T12:00:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c",
    employeeId: "EMP012",
    firstName: "Susan",
    lastName: "Lopez",
    workEmail: "susan.lopez@hospital.com",
    phoneNumber: "+1-555-0112",
    role: "RECEPTIONIST",
    department: "OPD",
    employmentDate: "2021-06-14",
    workingHours: "8:00 AM - 4:00 PM",
    qualifications: "AA",
    status: true,
    createdAt: "2021-06-01T10:00:00Z",
    updatedAt: "2023-01-25T14:30:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d",
    employeeId: "EMP013",
    firstName: "Joseph",
    lastName: "Wilson",
    workEmail: "joseph.wilson@hospital.com",
    phoneNumber: "+1-555-0113",
    role: "DOCTOR",
    department: "SURGERY",
    employmentDate: "2013-05-30",
    workingHours: "7:00 AM - 5:00 PM",
    specialisation: "Cardiothoracic Surgery",
    licenseNumber: "LIC123456",
    qualifications: "MD, FACS, FCCP",
    consultationFee: "$500",
    status: true,
    createdAt: "2013-05-15T11:00:00Z",
    updatedAt: "2023-04-10T08:20:00Z",
    createdBy: "b7c9d8e0-f1a2-4b3c-8d4e-5f6a7b8c9d0e",
    updatedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e",
    employeeId: "EMP014",
    firstName: "Jessica",
    lastName: "Anderson",
    workEmail: "jessica.anderson@hospital.com",
    phoneNumber: "+45533322W",
    role: "NURSE",
    department: "CARDIOLOGY",
    employmentDate: "2020-11-09",
    workingHours: "9:00 AM - 5:00 PM",
    specialisation: "Cardiac Nursing",
    licenseNumber: "LIC234567",
    qualifications: "RN, BSN, CV-BC",
    status: true,
    createdAt: "2020-10-25T09:30:00Z",
    updatedAt: "2023-02-28T15:45:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f",
    employeeId: "EMP015",
    firstName: "Thomas",
    lastName: "Thomas",
    workEmail: "thomas.thomas@hospital.com",
    phoneNumber: "+1-555-0115",
    role: "DOCTOR",
    department: "SURGERY",
    employmentDate: "2017-08-17",
    workingHours: "8:00 AM - 5:00 PM",
    specialisation: "Sports Medicine",
    licenseNumber: "LIC345678",
    qualifications: "MD, CAQSM",
    consultationFee: "$280",
    status: false,
    endDate: "2023-08-31",
    createdAt: "2017-08-01T12:00:00Z",
    updatedAt: "2023-07-20T10:00:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "d6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a",
    employeeId: "EMP016",
    firstName: "Sarah",
    lastName: "Taylor",
    workEmail: "sarah.taylor@hospital.com",
    phoneNumber: "+1-555-0116",
    role: "PHARMACIST",
    department: "PHARMACY",
    employmentDate: "2019-10-05",
    workingHours: "10:00 AM - 6:00 PM",
    specialisation: "Oncology Pharmacy",
    licenseNumber: "LIC456789",
    qualifications: "PharmD, BCOP",
    status: true,
    createdAt: "2019-09-20T14:00:00Z",
    updatedAt: "2023-01-12T11:10:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b",
    employeeId: "EMP017",
    firstName: "Charles",
    lastName: "Moore",
    workEmail: "charles.moore@hospital.com",
    phoneNumber: "+1-555-0117",
    role: "LAB_TECH",
    department: "NEUROLOGY",
    employmentDate: "2016-04-12",
    workingHours: "8:00 AM - 4:00 PM",
    specialisation: "Speech Therapy",
    licenseNumber: "LIC567890",
    qualifications: "MS, CCC-SLP",
    consultationFee: "$180",
    status: true,
    createdAt: "2016-04-01T10:30:00Z",
    updatedAt: "2023-03-22T13:20:00Z",
    createdBy: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    updatedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c",
    employeeId: "EMP018",
    firstName: "Karen",
    lastName: "Jackson",
    workEmail: "karen.jackson@hospital.com",
    phoneNumber: "+334445555",
    role: "ADMIN",
    department: "EMERGENCY",
    employmentDate: "2021-12-01",
    workingHours: "9:00 AM - 5:00 PM",
    qualifications: "BSN, MHA",
    status: true,
    createdAt: "2021-11-15T08:00:00Z",
    updatedAt: "2023-04-18T09:30:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "b7c9d8e0-f1a2-4b3c-8d4e-5f6a7b8c9d0e",
  },
  {
    id: "a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d",
    employeeId: "EMP019",
    firstName: "John",
    lastName: "Martin",
    workEmail: "john.martin@hospital.com",
    phoneNumber: "+1-555-0119",
    role: "DOCTOR",
    department: "RADIOLOGY",
    employmentDate: "2015-02-28",
    workingHours: "8:30 AM - 4:30 PM",
    specialisation: "Interventional Radiology",
    licenseNumber: "LIC678901",
    qualifications: "MD, FSIR",
    consultationFee: "$320",
    status: true,
    createdAt: "2015-02-15T13:00:00Z",
    updatedAt: "2023-05-05T10:00:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e",
    employeeId: "EMP020",
    firstName: "Patricia",
    lastName: "Lee",
    workEmail: "patricia.lee@hospital.com",
    phoneNumber: "+1-555-0120",
    role: "NURSE",
    department: "PEDIATRICS",
    employmentDate: "2020-07-22",
    workingHours: "7:00 AM - 3:00 PM",
    specialisation: "Pediatric Nursing",
    licenseNumber: "LIC789012",
    qualifications: "RN, BSN, CPN",
    status: false,
    endDate: "2023-09-15",
    createdAt: "2020-07-07T11:00:00Z",
    updatedAt: "2023-08-01T14:00:00Z",
    createdBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    updatedBy: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
] satisfies Staff[];

// export const staffDataMock = [
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440000",
//         "personalInfo": {
//             "fullName": "Sarah Johnson",
//             "gender": "Female",
//             "dateOfBirth": "1988-05-15",
//             "photo": "https://randomuser.me/api/portraits/women/1.jpg",
//             "nationalId": "SSN-123-45-6789"
//         },
//         "contactInfo": {
//             "email": "sarah.johnson@company.com",
//             "phone": "+1 (555) 123-4567",
//             "address": {
//                 "street": "123 Oak Street",
//                 "city": "San Francisco",
//                 "state": "CA",
//                 "zipCode": "94105",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Michael Johnson",
//                 "relationship": "Spouse",
//                 "phone": "+1 (555) 987-6543",
//                 "email": "michael.johnson@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-001",
//             "department": "Engineering",
//             "position": "Senior Software Engineer",
//             "role": "Team Lead",
//             "employmentType": "Full-time",
//             "dateJoined": "2020-03-15",
//             "reportingManager": "Robert Chen",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "sjohnson",
//             "systemRole": "Manager",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-11T14:30:00Z",
//             "accessLevel": "Write"
//         },
//         "createdAt": "2020-03-15T10:00:00Z",
//         "updatedAt": "2026-08-10T16:45:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440001",
//         "personalInfo": {
//             "fullName": "Michael Chen",
//             "gender": "Male",
//             "dateOfBirth": "1990-11-23",
//             "photo": "https://randomuser.me/api/portraits/men/2.jpg",
//             "nationalId": "SSN-234-56-7890"
//         },
//         "contactInfo": {
//             "email": "michael.chen@company.com",
//             "phone": "+1 (555) 234-5678",
//             "address": {
//                 "street": "456 Pine Avenue",
//                 "city": "New York",
//                 "state": "NY",
//                 "zipCode": "10001",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Lisa Chen",
//                 "relationship": "Sister",
//                 "phone": "+1 (555) 876-5432",
//                 "email": "lisa.chen@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-002",
//             "department": "Engineering",
//             "position": "Software Engineer",
//             "role": "Developer",
//             "employmentType": "Full-time",
//             "dateJoined": "2021-06-01",
//             "reportingManager": "Sarah Johnson",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "mchen",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T09:15:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2021-06-01T09:30:00Z",
//         "updatedAt": "2026-08-09T11:20:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440002",
//         "personalInfo": {
//             "fullName": "Emily Rodriguez",
//             "gender": "Female",
//             "dateOfBirth": "1985-03-10",
//             "photo": "https://randomuser.me/api/portraits/women/3.jpg",
//             "nationalId": "SSN-345-67-8901"
//         },
//         "contactInfo": {
//             "email": "emily.rodriguez@company.com",
//             "phone": "+1 (555) 345-6789",
//             "address": {
//                 "street": "789 Maple Drive",
//                 "city": "Austin",
//                 "state": "TX",
//                 "zipCode": "78701",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "David Rodriguez",
//                 "relationship": "Husband",
//                 "phone": "+1 (555) 765-4321",
//                 "email": "david.rodriguez@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-003",
//             "department": "Marketing",
//             "position": "Marketing Director",
//             "role": "Department Head",
//             "employmentType": "Full-time",
//             "dateJoined": "2019-08-20",
//             "reportingManager": "Robert Chen",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "erodriguez",
//             "systemRole": "Manager",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T16:45:00Z",
//             "accessLevel": "Write"
//         },
//         "createdAt": "2019-08-20T11:00:00Z",
//         "updatedAt": "2026-08-10T16:45:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440003",
//         "personalInfo": {
//             "fullName": "James Wilson",
//             "gender": "Male",
//             "dateOfBirth": "1978-12-01",
//             "photo": "https://randomuser.me/api/portraits/men/4.jpg",
//             "nationalId": "SSN-456-78-9012"
//         },
//         "contactInfo": {
//             "email": "james.wilson@company.com",
//             "phone": "+1 (555) 456-7890",
//             "address": {
//                 "street": "321 Cedar Street",
//                 "city": "Seattle",
//                 "state": "WA",
//                 "zipCode": "98101",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Jennifer Wilson",
//                 "relationship": "Wife",
//                 "phone": "+1 (555) 654-3210",
//                 "email": "jennifer.wilson@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-004",
//             "department": "Human Resources",
//             "position": "HR Manager",
//             "role": "Department Head",
//             "employmentType": "Full-time",
//             "dateJoined": "2018-01-15",
//             "reportingManager": "Robert Chen",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "jwilson",
//             "systemRole": "Manager",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-09T13:20:00Z",
//             "accessLevel": "Write"
//         },
//         "createdAt": "2018-01-15T10:30:00Z",
//         "updatedAt": "2026-08-09T13:20:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440004",
//         "personalInfo": {
//             "fullName": "Amanda Patel",
//             "gender": "Female",
//             "dateOfBirth": "1992-07-19",
//             "photo": "https://randomuser.me/api/portraits/women/5.jpg",
//             "nationalId": "SSN-567-89-0123"
//         },
//         "contactInfo": {
//             "email": "amanda.patel@company.com",
//             "phone": "+1 (555) 567-8901",
//             "address": {
//                 "street": "654 Birch Lane",
//                 "city": "Chicago",
//                 "state": "IL",
//                 "zipCode": "60601",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Raj Patel",
//                 "relationship": "Brother",
//                 "phone": "+1 (555) 543-2109",
//                 "email": "raj.patel@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-005",
//             "department": "Finance",
//             "position": "Financial Analyst",
//             "role": "Analyst",
//             "employmentType": "Full-time",
//             "dateJoined": "2022-02-01",
//             "reportingManager": "Emily Rodriguez",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "apatel",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T11:00:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2022-02-01T08:45:00Z",
//         "updatedAt": "2026-08-10T11:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440005",
//         "personalInfo": {
//             "fullName": "David Kim",
//             "gender": "Male",
//             "dateOfBirth": "1983-09-05",
//             "photo": "https://randomuser.me/api/portraits/men/6.jpg",
//             "nationalId": "SSN-678-90-1234"
//         },
//         "contactInfo": {
//             "email": "david.kim@company.com",
//             "phone": "+1 (555) 678-9012",
//             "address": {
//                 "street": "987 Spruce Way",
//                 "city": "Los Angeles",
//                 "state": "CA",
//                 "zipCode": "90001",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Susan Kim",
//                 "relationship": "Sister",
//                 "phone": "+1 (555) 432-1098",
//                 "email": "susan.kim@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-006",
//             "department": "Engineering",
//             "position": "Senior Software Engineer",
//             "role": "Tech Lead",
//             "employmentType": "Full-time",
//             "dateJoined": "2019-11-10",
//             "reportingManager": "Sarah Johnson",
//             "employmentStatus": "On Leave"
//         },
//         "systemInfo": {
//             "userAccount": "dkim",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-08T08:30:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2019-11-10T14:15:00Z",
//         "updatedAt": "2026-08-08T08:30:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440006",
//         "personalInfo": {
//             "fullName": "Jessica Taylor",
//             "gender": "Female",
//             "dateOfBirth": "1995-01-28",
//             "photo": "https://randomuser.me/api/portraits/women/7.jpg",
//             "nationalId": "SSN-789-01-2345"
//         },
//         "contactInfo": {
//             "email": "jessica.taylor@company.com",
//             "phone": "+1 (555) 789-0123",
//             "address": {
//                 "street": "147 Willow Road",
//                 "city": "Miami",
//                 "state": "FL",
//                 "zipCode": "33101",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Mark Taylor",
//                 "relationship": "Father",
//                 "phone": "+1 (555) 321-0987",
//                 "email": "mark.taylor@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-007",
//             "department": "Design",
//             "position": "UX Designer",
//             "role": "Designer",
//             "employmentType": "Part-time",
//             "dateJoined": "2023-04-15",
//             "reportingManager": "Emily Rodriguez",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "jtaylor",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T15:30:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2023-04-15T09:00:00Z",
//         "updatedAt": "2026-08-10T15:30:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440007",
//         "personalInfo": {
//             "fullName": "Robert Martinez",
//             "gender": "Male",
//             "dateOfBirth": "1980-06-12",
//             "photo": "https://randomuser.me/api/portraits/men/8.jpg",
//             "nationalId": "SSN-890-12-3456"
//         },
//         "contactInfo": {
//             "email": "robert.martinez@company.com",
//             "phone": "+1 (555) 890-1234",
//             "address": {
//                 "street": "258 Ash Avenue",
//                 "city": "Denver",
//                 "state": "CO",
//                 "zipCode": "80201",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Maria Martinez",
//                 "relationship": "Wife",
//                 "phone": "+1 (555) 210-9876",
//                 "email": "maria.martinez@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-008",
//             "department": "Operations",
//             "position": "Operations Manager",
//             "role": "Department Head",
//             "employmentType": "Full-time",
//             "dateJoined": "2017-05-20",
//             "reportingManager": "Robert Chen",
//             "employmentStatus": "Inactive"
//         },
//         "systemInfo": {
//             "userAccount": "rmartinez",
//             "systemRole": "Manager",
//             "accountStatus": "Inactive",
//             "lastLogin": "2026-07-15T08:00:00Z",
//             "accessLevel": "Write"
//         },
//         "createdAt": "2017-05-20T13:45:00Z",
//         "updatedAt": "2026-07-15T08:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440008",
//         "personalInfo": {
//             "fullName": "Lisa Park",
//             "gender": "Female",
//             "dateOfBirth": "1991-10-30",
//             "photo": "https://randomuser.me/api/portraits/women/9.jpg",
//             "nationalId": "SSN-901-23-4567"
//         },
//         "contactInfo": {
//             "email": "lisa.park@company.com",
//             "phone": "+1 (555) 901-2345",
//             "address": {
//                 "street": "369 Poplar Court",
//                 "city": "Boston",
//                 "state": "MA",
//                 "zipCode": "02101",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Daniel Park",
//                 "relationship": "Brother",
//                 "phone": "+1 (555) 109-8765",
//                 "email": "daniel.park@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-009",
//             "department": "Sales",
//             "position": "Sales Representative",
//             "role": "Sales",
//             "employmentType": "Full-time",
//             "dateJoined": "2021-09-01",
//             "reportingManager": "James Wilson",
//             "employmentStatus": "Pending Approval"
//         },
//         "systemInfo": {
//             "userAccount": "lpark",
//             "systemRole": "Employee",
//             "accountStatus": "Pending",
//             "lastLogin": "2026-08-09T10:00:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2021-09-01T11:30:00Z",
//         "updatedAt": "2026-08-09T10:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440009",
//         "personalInfo": {
//             "fullName": "Thomas Brown",
//             "gender": "Male",
//             "dateOfBirth": "1987-04-18",
//             "photo": "https://randomuser.me/api/portraits/men/10.jpg",
//             "nationalId": "SSN-012-34-5678"
//         },
//         "contactInfo": {
//             "email": "thomas.brown@company.com",
//             "phone": "+1 (555) 012-3456",
//             "address": {
//                 "street": "753 Elm Street",
//                 "city": "San Diego",
//                 "state": "CA",
//                 "zipCode": "92101",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Patricia Brown",
//                 "relationship": "Wife",
//                 "phone": "+1 (555) 098-7654",
//                 "email": "patricia.brown@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-010",
//             "department": "Marketing",
//             "position": "Content Strategist",
//             "role": "Marketing Specialist",
//             "employmentType": "Full-time",
//             "dateJoined": "2020-10-05",
//             "reportingManager": "Emily Rodriguez",
//             "employmentStatus": "On Leave"
//         },
//         "systemInfo": {
//             "userAccount": "tbrown",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-07T14:00:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2020-10-05T12:00:00Z",
//         "updatedAt": "2026-08-07T14:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440010",
//         "personalInfo": {
//             "fullName": "Rachel Green",
//             "gender": "Female",
//             "dateOfBirth": "1993-08-22",
//             "photo": "https://randomuser.me/api/portraits/women/11.jpg",
//             "nationalId": "SSN-123-45-6789"
//         },
//         "contactInfo": {
//             "email": "rachel.green@company.com",
//             "phone": "+1 (555) 123-7890",
//             "address": {
//                 "street": "852 Oak Lane",
//                 "city": "Portland",
//                 "state": "OR",
//                 "zipCode": "97201",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Monica Green",
//                 "relationship": "Sister",
//                 "phone": "+1 (555) 987-0123",
//                 "email": "monica.green@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-011",
//             "department": "Engineering",
//             "position": "DevOps Engineer",
//             "role": "Developer",
//             "employmentType": "Full-time",
//             "dateJoined": "2022-07-15",
//             "reportingManager": "Sarah Johnson",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "rgreen",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T13:45:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2022-07-15T10:30:00Z",
//         "updatedAt": "2026-08-10T13:45:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440011",
//         "personalInfo": {
//             "fullName": "Kevin Wright",
//             "gender": "Male",
//             "dateOfBirth": "1976-02-14",
//             "photo": "https://randomuser.me/api/portraits/men/12.jpg",
//             "nationalId": "SSN-234-56-7890"
//         },
//         "contactInfo": {
//             "email": "kevin.wright@company.com",
//             "phone": "+1 (555) 234-8901",
//             "address": {
//                 "street": "963 Maple Court",
//                 "city": "Phoenix",
//                 "state": "AZ",
//                 "zipCode": "85001",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Nancy Wright",
//                 "relationship": "Wife",
//                 "phone": "+1 (555) 876-0123",
//                 "email": "nancy.wright@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-012",
//             "department": "Finance",
//             "position": "Senior Accountant",
//             "role": "Finance Lead",
//             "employmentType": "Full-time",
//             "dateJoined": "2016-03-10",
//             "reportingManager": "James Wilson",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "kwright",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-09T16:00:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2016-03-10T09:15:00Z",
//         "updatedAt": "2026-08-09T16:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440012",
//         "personalInfo": {
//             "fullName": "Michelle Lee",
//             "gender": "Female",
//             "dateOfBirth": "1994-11-07",
//             "photo": "https://randomuser.me/api/portraits/women/13.jpg",
//             "nationalId": "SSN-345-67-8901"
//         },
//         "contactInfo": {
//             "email": "michelle.lee@company.com",
//             "phone": "+1 (555) 345-9012",
//             "address": {
//                 "street": "159 Pine Road",
//                 "city": "Dallas",
//                 "state": "TX",
//                 "zipCode": "75201",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Steven Lee",
//                 "relationship": "Husband",
//                 "phone": "+1 (555) 765-0123",
//                 "email": "steven.lee@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-013",
//             "department": "Design",
//             "position": "Graphic Designer",
//             "role": "Designer",
//             "employmentType": "Part-time",
//             "dateJoined": "2023-01-20",
//             "reportingManager": "Emily Rodriguez",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "mlee",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T12:00:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2023-01-20T14:30:00Z",
//         "updatedAt": "2026-08-10T12:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440013",
//         "personalInfo": {
//             "fullName": "Daniel Garcia",
//             "gender": "Male",
//             "dateOfBirth": "1989-07-03",
//             "photo": "https://randomuser.me/api/portraits/men/14.jpg",
//             "nationalId": "SSN-456-78-9012"
//         },
//         "contactInfo": {
//             "email": "daniel.garcia@company.com",
//             "phone": "+1 (555) 456-0123",
//             "address": {
//                 "street": "753 Birch Street",
//                 "city": "Atlanta",
//                 "state": "GA",
//                 "zipCode": "30301",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Sophia Garcia",
//                 "relationship": "Sister",
//                 "phone": "+1 (555) 654-0123",
//                 "email": "sophia.garcia@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-014",
//             "department": "Sales",
//             "position": "Sales Manager",
//             "role": "Team Lead",
//             "employmentType": "Full-time",
//             "dateJoined": "2019-02-01",
//             "reportingManager": "James Wilson",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "dgarcia",
//             "systemRole": "Manager",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T10:30:00Z",
//             "accessLevel": "Write"
//         },
//         "createdAt": "2019-02-01T11:45:00Z",
//         "updatedAt": "2026-08-10T10:30:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440014",
//         "personalInfo": {
//             "fullName": "Jennifer Anderson",
//             "gender": "Female",
//             "dateOfBirth": "1982-12-25",
//             "photo": "https://randomuser.me/api/portraits/women/15.jpg",
//             "nationalId": "SSN-567-89-0123"
//         },
//         "contactInfo": {
//             "email": "jennifer.anderson@company.com",
//             "phone": "+1 (555) 567-1234",
//             "address": {
//                 "street": "852 Cedar Avenue",
//                 "city": "Washington",
//                 "state": "DC",
//                 "zipCode": "20001",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "William Anderson",
//                 "relationship": "Husband",
//                 "phone": "+1 (555) 543-0123",
//                 "email": "william.anderson@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-015",
//             "department": "Human Resources",
//             "position": "HR Specialist",
//             "role": "HR",
//             "employmentType": "Full-time",
//             "dateJoined": "2018-08-15",
//             "reportingManager": "James Wilson",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "janderson",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-08T15:00:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2018-08-15T09:30:00Z",
//         "updatedAt": "2026-08-08T15:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440015",
//         "personalInfo": {
//             "fullName": "Christopher Murphy",
//             "gender": "Male",
//             "dateOfBirth": "1986-05-09",
//             "photo": "https://randomuser.me/api/portraits/men/16.jpg",
//             "nationalId": "SSN-678-90-1234"
//         },
//         "contactInfo": {
//             "email": "christopher.murphy@company.com",
//             "phone": "+1 (555) 678-2345",
//             "address": {
//                 "street": "369 Oak Drive",
//                 "city": "Philadelphia",
//                 "state": "PA",
//                 "zipCode": "19101",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Barbara Murphy",
//                 "relationship": "Mother",
//                 "phone": "+1 (555) 432-0123",
//                 "email": "barbara.murphy@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-016",
//             "department": "Operations",
//             "position": "Project Manager",
//             "role": "Manager",
//             "employmentType": "Full-time",
//             "dateJoined": "2017-12-01",
//             "reportingManager": "Robert Martinez",
//             "employmentStatus": "Inactive"
//         },
//         "systemInfo": {
//             "userAccount": "cmurphy",
//             "systemRole": "Manager",
//             "accountStatus": "Inactive",
//             "lastLogin": "2026-07-20T11:00:00Z",
//             "accessLevel": "Write"
//         },
//         "createdAt": "2017-12-01T13:00:00Z",
//         "updatedAt": "2026-07-20T11:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440016",
//         "personalInfo": {
//             "fullName": "Stephanie Adams",
//             "gender": "Female",
//             "dateOfBirth": "1990-09-17",
//             "photo": "https://randomuser.me/api/portraits/women/17.jpg",
//             "nationalId": "SSN-789-01-2345"
//         },
//         "contactInfo": {
//             "email": "stephanie.adams@company.com",
//             "phone": "+1 (555) 789-3456",
//             "address": {
//                 "street": "258 Maple Drive",
//                 "city": "Detroit",
//                 "state": "MI",
//                 "zipCode": "48201",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Brian Adams",
//                 "relationship": "Brother",
//                 "phone": "+1 (555) 321-0123",
//                 "email": "brian.adams@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-017",
//             "department": "Engineering",
//             "position": "Software Engineer",
//             "role": "Developer",
//             "employmentType": "Full-time",
//             "dateJoined": "2021-11-01",
//             "reportingManager": "Sarah Johnson",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "sadams",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-09T14:30:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2021-11-01T10:15:00Z",
//         "updatedAt": "2026-08-09T14:30:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440017",
//         "personalInfo": {
//             "fullName": "Ryan Thompson",
//             "gender": "Male",
//             "dateOfBirth": "1984-03-28",
//             "photo": "https://randomuser.me/api/portraits/men/18.jpg",
//             "nationalId": "SSN-890-12-3456"
//         },
//         "contactInfo": {
//             "email": "ryan.thompson@company.com",
//             "phone": "+1 (555) 890-4567",
//             "address": {
//                 "street": "147 Willow Avenue",
//                 "city": "Minneapolis",
//                 "state": "MN",
//                 "zipCode": "55401",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Elizabeth Thompson",
//                 "relationship": "Wife",
//                 "phone": "+1 (555) 210-0123",
//                 "email": "elizabeth.thompson@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-018",
//             "department": "Marketing",
//             "position": "Digital Marketing Specialist",
//             "role": "Marketing",
//             "employmentType": "Part-time",
//             "dateJoined": "2022-09-15",
//             "reportingManager": "Emily Rodriguez",
//             "employmentStatus": "Pending Approval"
//         },
//         "systemInfo": {
//             "userAccount": "rthompson",
//             "systemRole": "Employee",
//             "accountStatus": "Pending",
//             "lastLogin": "2026-08-08T09:00:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2022-09-15T12:30:00Z",
//         "updatedAt": "2026-08-08T09:00:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440018",
//         "personalInfo": {
//             "fullName": "Kimberly White",
//             "gender": "Female",
//             "dateOfBirth": "1993-06-14",
//             "photo": "https://randomuser.me/api/portraits/women/19.jpg",
//             "nationalId": "SSN-901-23-4567"
//         },
//         "contactInfo": {
//             "email": "kimberly.white@company.com",
//             "phone": "+1 (555) 901-5678",
//             "address": {
//                 "street": "753 Chestnut Street",
//                 "city": "Nashville",
//                 "state": "TN",
//                 "zipCode": "37201",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Jonathan White",
//                 "relationship": "Husband",
//                 "phone": "+1 (555) 109-0123",
//                 "email": "jonathan.white@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-019",
//             "department": "Finance",
//             "position": "Junior Accountant",
//             "role": "Finance",
//             "employmentType": "Full-time",
//             "dateJoined": "2023-06-01",
//             "reportingManager": "Kevin Wright",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "kwhite",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T08:15:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2023-06-01T09:30:00Z",
//         "updatedAt": "2026-08-10T08:15:00Z"
//     },
//     {
//         "id": "550e8400-e29b-41d4-a716-446655440019",
//         "personalInfo": {
//             "fullName": "Mark Williams",
//             "gender": "Male",
//             "dateOfBirth": "1979-11-11",
//             "photo": "https://randomuser.me/api/portraits/men/20.jpg",
//             "nationalId": "SSN-012-34-5678"
//         },
//         "contactInfo": {
//             "email": "mark.williams@company.com",
//             "phone": "+1 (555) 012-6789",
//             "address": {
//                 "street": "963 Spruce Road",
//                 "city": "St. Louis",
//                 "state": "MO",
//                 "zipCode": "63101",
//                 "country": "USA"
//             },
//             "emergencyContact": {
//                 "name": "Julie Williams",
//                 "relationship": "Wife",
//                 "phone": "+1 (555) 098-0123",
//                 "email": "julie.williams@email.com"
//             }
//         },
//         "employmentInfo": {
//             "employeeId": "EMP-020",
//             "department": "Operations",
//             "position": "Facilities Coordinator",
//             "role": "Operations",
//             "employmentType": "Full-time",
//             "dateJoined": "2015-01-10",
//             "reportingManager": "Robert Martinez",
//             "employmentStatus": "Active"
//         },
//         "systemInfo": {
//             "userAccount": "mwilliams",
//             "systemRole": "Employee",
//             "accountStatus": "Active",
//             "lastLogin": "2026-08-10T11:45:00Z",
//             "accessLevel": "Read"
//         },
//         "createdAt": "2015-01-10T14:00:00Z",
//         "updatedAt": "2026-08-10T11:45:00Z"
//     }
// ];
