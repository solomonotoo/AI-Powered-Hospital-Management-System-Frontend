import { Department, Role, Status } from "./staff";

export interface StaffResponse {
  staffId: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  role: Role;
  specialisation: string;
  department: Department;
  workEmail: string;
  phone: string;
  qualifications: string;
  licenseNumber: string;
  joiningDate: string;
  workingHours: string;
  consultationFee: string;
  status: Status;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // UUID
  updatedBy?: string; // UUID
}


export interface StaffSummaryResponse {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  onDutyStaff: number;
  onLeaveStaff: number;
}