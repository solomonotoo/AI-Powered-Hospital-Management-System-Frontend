import { StaffFormInput, StaffFormValues } from "../schema/staff-schema";
import { Department, Role, Staff, StaffSummaryCardTypes } from "../types/staff";
import { CreateStaffRequest } from "../types/staff-request";
import { StaffResponse, StaffSummaryResponse } from "../types/staff-response";
import { getCurrentFacilityId } from "@/lib/auth";

/**
 * Normalizes any backend StaffCategory enum or string to a valid frontend Role value.
 */
export function normalizeStaffRole(rawRole?: string | null): Role {
  if (!rawRole) return "DOCTOR";
  const normalized = rawRole.trim().toUpperCase().replace(/[-\s]+/g, "_");

  const validRoles: Role[] = [
    "DOCTOR",
    "NURSE",
    "ADMIN",
    "BILLING_STAFF",
    "RECEPTIONIST",
    "WARD_MANAGER",
    "LAB_TECH",
    "PHARMACIST",
    "RADIOLOGIST",
    "SUPER_ADMIN",
    "ADMINSTRATIVE",
  ];

  if (validRoles.includes(normalized as Role)) {
    return normalized as Role;
  }

  switch (normalized) {
    case "GENERALIST_MEDICAL_PRACTITIONER":
    case "SPECIALIST_MEDICAL_PRACTITIONER":
    case "MEDICAL_ASSISTANT":
    case "DENTIST":
    case "DENTAL_THERAPIST":
    case "PHYSICIAN":
    case "DOCTORS":
      return "DOCTOR";

    case "NURSING_PROFESSIONAL":
    case "NURSING_ASSOCIATE_PROFESSIONAL":
    case "MIDWIFERY_PROFESSIONAL":
    case "COMMUNITY_HEALTH_NURSE":
    case "NURSE_ASSISTANT_CLINICAL":
    case "NURSE_ASSISTANT_PREVENTIVE":
    case "NURSES":
      return "NURSE";

    case "HEALTH_SERVICE_ADMINISTRATOR":
    case "HOSPITAL_ADMIN":
      return "ADMIN";

    case "ACCOUNTANT":
    case "FINANCE":
      return "BILLING_STAFF";

    case "HUMAN_RESOURCE_OFFICER":
    case "ADMINISTRATIVE":
    case "HR":
      return "ADMINSTRATIVE";

    case "LABORATORY_TECHNICIAN":
    case "MEDICAL_LABORATORY_TECHNOLOGIST":
    case "LAB_TECHNICIAN":
    case "TECHNICIAN":
      return "LAB_TECH";

    case "MEDICAL_IMAGING_OPERATOR":
    case "RADIOGRAPHER":
      return "RADIOLOGIST";

    case "PHARMACEUTICAL_TECHNICIAN":
    case "PHARMACY_TECHNICIAN":
      return "PHARMACIST";

    case "INFORMATION_TECHNOLOGY":
    case "IT":
      return "SUPER_ADMIN";

    case "OTHER_SUPPORT_STAFF":
    case "DRIVER":
      return "RECEPTIONIST";

    default:
      return "DOCTOR";
  }
}

/**
 * Normalizes backend department string to a valid frontend Department enum value.
 */
export function normalizeStaffDepartment(dept?: string | null): Department | undefined {
  if (!dept) return undefined;
  const normalized = dept.trim().toUpperCase().replace(/[-\s]+/g, "_");
  const validDepartments: Department[] = [
    "RADIOLOGY",
    "CARDIOLOGY",
    "ONCOLOGY",
    "NEUROLOGY",
    "ORTHOPEDICS",
    "PEDIATRICS",
    "DERMATOLOGY",
    "OTOLARYNGOLOGY",
    "OPHTHALMOLOGY",
    "UROLOGY",
    "SURGERY",
    "EMERGENCY",
    "PHARMACY",
    "OPD",
  ];

  if (validDepartments.includes(normalized as Department)) {
    return normalized as Department;
  }
  return undefined;
}

// Maps UI form values to the CreateStaffRequest DTO expected by the backend
export function toCreateStaffRequest(values: StaffFormValues): CreateStaffRequest {
  return {
    employeeNumber: values.employeeId, // Map form employeeId to backend employeeNumber
    firstName: values.firstName,
    lastName: values.lastName,
    role: values.role,
    specialisation: values.specialisation,
    department: values.department,
    workEmail: values.workEmail,
    phone: values.phoneNumber, // Map form phoneNumber to backend phone
    qualifications: values.qualifications, // Include qualifications field
    licenseNumber: values.licenseNumber,
    joiningDate: values.employmentDate, // Map form employmentDate to backend joiningDate
    workingHours: values.workingHours,
    consultationFee: values.consultationFee,
    facilityId: values.facilityId || getCurrentFacilityId() || "",
  };
}

//API RESPONSE -> UI MODEL
//Thus maps API field to UI field
export function toStaff(response: StaffResponse): Staff {
  console.log("API RESPONSE STATUS:", response.status);
  return {
    id: response.staffId,
    employeeId: response.employeeNumber,
    firstName: response.firstName,
    lastName: response.lastName,
    role: normalizeStaffRole(response.role),
    specialisation: response.specialisation,
    department: normalizeStaffDepartment(response.department),
    workEmail: response.workEmail,
    phoneNumber: response.phone,
    licenseNumber: response.licenseNumber,
    employmentDate: response.joiningDate,
    workingHours: response.workingHours,
    consultationFee: response.consultationFee,
    status: response.status,
    endDate: response.endDate,
    facilityId: response.facilityId || "",
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    createdBy: response.createdBy, // UUID
    updatedBy: response.updatedBy,
  };
}

//for form editing
export function toStaffFormValues(staff: Staff): Partial<StaffFormInput> {
  const cleanDate = staff.employmentDate ? staff.employmentDate.split("T")[0] : "";
  const cleanTime = staff.workingHours
    ? staff.workingHours.length > 5
      ? staff.workingHours.substring(0, 5)
      : staff.workingHours
    : "";

  return {
    employeeId: staff.employeeId,
    firstName: staff.firstName,
    lastName: staff.lastName,
    workEmail: staff.workEmail,
    phoneNumber: staff.phoneNumber ?? "",
    role: normalizeStaffRole(staff.role),
    department: (normalizeStaffDepartment(staff.department) ?? "") as unknown as Department,
    employmentDate: cleanDate,
    workingHours: cleanTime,
    specialisation: staff.specialisation ?? "",
    licenseNumber: staff.licenseNumber ?? "",
    qualifications: staff.qualifications ?? "",
    consultationFee: staff.consultationFee ? String(staff.consultationFee) : "",
    facilityId: staff.facilityId || getCurrentFacilityId() || "",
  };
}

export function toStaffSummary(response: StaffSummaryResponse): StaffSummaryCardTypes {
  return {
    totalStaff: response.totalStaff,
    activeStaff: response.activeStaff,
    inactiveStaff: response.inactiveStaff,
    onDutyStaff: response.onDutyStaff,
    onLeaveStaff: response.onLeaveStaff,
  };
} 

// Maps UI form values to the UpdateStaffRequest DTO for editing existing staff
export function toUpdateStaffRequest(values: StaffFormValues): import("../types/staff-update-request").UpdateStaffRequest {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    role: values.role,
    specialisation: values.specialisation,
    department: values.department,
    workEmail: values.workEmail,
    phone: values.phoneNumber,
    qualifications: values.qualifications,
    licenseNumber: values.licenseNumber,
    workingHours: values.workingHours,
    consultationFee: values.consultationFee,
  };
}

