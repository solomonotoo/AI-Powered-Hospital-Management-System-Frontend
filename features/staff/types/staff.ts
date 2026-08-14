import { UseFormReturn } from "react-hook-form";
import { StaffFormInput } from "../schema/staff-schema";
import z from "zod";
import { departmentEnum, roleEnum } from "../schema/enums";

export type Role = z.infer<typeof roleEnum>;
export type Department = z.infer<typeof departmentEnum>;

export interface StaffSummaryCardTypes {
  totalStaff: number;
  activeStaff: number;
  inActiveStaff: number;
  pendingApprovalStaff: number;
  onDutyStaff: number;
  onLeaveStaff: number;
}

export interface Staff {
  id: string;
  // Basic Information
  employeeId: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  phoneNumber?: string;

  // Employment & Assignment
  role: Role;
  department: Department;
  employmentDate: string;
  workingHours: string;

  // Professional Information
  specialisation?: string;
  licenseNumber?: string;
  qualifications?: string;
  consultationFee?: string;

  status: boolean;
  endDate?: string;

  //auditmetadata
  createdAt: string;
  updatedAt: string;
  createdBy: string; // UUID
  updatedBy?: string; // UUID
}

// export interface Staff {
//   id: string;
//   employeeId: string;
//   firstName: string;
//   lastName: string;
//   workEmail: string;
//   phoneNumber?: string;

//   role: Role;
//   department: Department;
//   employmentDate: string;
//   workingHours: string;

//   specialisation?: string;
//   licenseNumber?: string;
//   qualifications?: string;
//   consultationFee?: string;
// }

// export interface Staff {
//   id: string;
//   personalInfo: {
//     fullName: string;
//     gender: string;
//     dateOfBirth: string;
//     photo: string;
//     nationalId: string;
//   };
//   contactInfo: {
//     email: string;
//     phone: string;
//     address: {
//       street: string;
//       city: string;
//       state: string;
//       zipCode: string;
//       country: string;
//     };
//     emergencyContact: {
//       name: string;
//       relationship: string;
//       phone: string;
//       email: string;
//     };
//   };
//   employmentInfo: {
//     employeeId: string;
//     department: string;
//     position: string;
//     role: string;
//     employmentType: string;
//     dateJoined: string;
//     reportingManager: string;
//     employmentStatus: string;
//   };
//   systemInfo: {
//     userAccount: string;
//     systemRole: string;
//     accountStatus: string;
//     lastLogin: string;
//     accessLevel: string;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Staff {
//     id: string;
//     employeeId: string;
//     fullName: string;
//     email: string;
//     phone: string;
//     gender: string;
//     dateOfBirth: string;
//     photo: string;
//     nationalId: string;
//     address: {
//         street: string;
//         city: string;
//         state: string;
//         zipCode: string;
//         country: string;
//     };
//     emergencyContact: {
//         name: string;
//         relationship: string;
//         phone: string;
//         email: string;
//     };
//     department: string;
//     position: string;
//     role: string;
//     employmentType: string;
//     dateJoined: string;
//     reportingManager: string;
//     employmentStatus: string;
//     userAccount: string;
//     systemRole: string;
//     accountStatus: string;
//     lastLogin: string;
//     accessLevel: string;
//     createdAt: string;
//     updatedAt: string;
// }

//interface for staff form steps
export interface StaffFormStepProps {
  form: UseFormReturn<StaffFormInput>;
}
