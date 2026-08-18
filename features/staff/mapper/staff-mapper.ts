//Data transformation

import { StaffFormInput, StaffFormValues } from "../schema/staff-schema";
import { Staff } from "../types/staff";
import { StaffResponse } from "../types/staff-response";

export function toCreateStaffRequest(values: StaffFormValues) {
  return {
    employeeNumber: values.employeeId,
    firstName: values.firstName,
    lastName: values.lastName,
    role: values.role,
    specialisation: values.specialisation,
    department: values.department,
    workEmail: values.workEmail,
    phone: values.phoneNumber,
    licenseNumber: values.licenseNumber,
    joiningDate: values.employmentDate,
    workingHours: values.workingHours,
    consultationFee: values.consultationFee,
  };
}

//API RESPONSE -> UI MODEL
//Thus maps API field to UI field
export function toStaff(response: StaffResponse): Staff {
  return {
    id: response.staffId,
    employeeId: response.employeeNumber,
    firstName: response.firstName,
    lastName: response.lastName,
    role: response.role,
    specialisation: response.specialisation,
    department: response.department,
    workEmail: response.workEmail,
    phoneNumber: response.phone,
    licenseNumber: response.licenseNumber,
    employmentDate: response.joiningDate,
    workingHours: response.workingHours,
    consultationFee: response.consultationFee,
    status: response.active,
    endDate: response.endDate,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    createdBy: response.createdBy, // UUID
    updatedBy: response.updatedAt,
  };
}

//for form editing
export function toStaffFormValues(staff: Staff): Partial<StaffFormInput> {
  return {
    employeeId: staff.employeeId,
    firstName: staff.firstName,
    lastName: staff.lastName,
    workEmail: staff.workEmail,
    phoneNumber: staff.phoneNumber ?? "",
    role: staff.role,
    department: staff.department,
    employmentDate: staff.employmentDate,
    workingHours: staff.workingHours,
    specialisation: staff.specialisation ?? "",
    licenseNumber: staff.licenseNumber ?? "",
    qualifications: staff.qualifications ?? "",
    consultationFee: staff.consultationFee ?? "",
  };
}
