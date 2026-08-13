import { UseFormReturn } from "react-hook-form";
import { StaffFormInput } from "../schema/staff-schema";

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
  personalInfo: {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    photo: string;
    nationalId: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
  };
  employmentInfo: {
    employeeId: string;
    department: string;
    position: string;
    role: string;
    employmentType: string;
    dateJoined: string;
    reportingManager: string;
    employmentStatus: string;
  };
  systemInfo: {
    userAccount: string;
    systemRole: string;
    accountStatus: string;
    lastLogin: string;
    accessLevel: string;
  };
  createdAt: string;
  updatedAt: string;
}

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
