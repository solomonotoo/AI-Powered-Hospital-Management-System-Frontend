import { Department, Role } from "./staff";

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
  active: boolean;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // UUID
  updatedBy?: string; // UUID
}
