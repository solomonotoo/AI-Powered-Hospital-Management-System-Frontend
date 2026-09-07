// This is what the backend expects when sending a create staff POST request
export interface CreateStaffRequest {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  specialisation?: string; // Optional specialization for medical roles
  department: string;
  workEmail: string;
  phone?: string; // Optional phone contact
  qualifications?: string; // Optional qualification credentials (matches backend/schema)
  licenseNumber?: string; // Optional medical license number
  joiningDate: string | Date; // Accepts ISO date string (YYYY-MM-DD) or Date instance
  workingHours?: string; // Optional shift/work hours
  consultationFee?: string; // Optional consultation charge
}
