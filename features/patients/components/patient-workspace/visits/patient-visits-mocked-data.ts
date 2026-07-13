import { PatientVisit } from "@/features/patients/types/visit";

export const mockVisits: PatientVisit[] = [
    {
      id: "1",
      visitNumber: "VST-20260710-001",
      visitType: "OPD",
      visitDate: "10 Jul 2026, 08:30 AM",
      department: "General Medicine",
      clinic: "Outpatient Clinic",
      clinician: "Dr. John Mensah",
      status: "Completed",
      chiefComplaint: "Fever and headache",
    },
    {
      id: "2",
      visitNumber: "VST-20260618-014",
      visitType: "EMERGENCY",
      visitDate: "18 Jun 2026, 09:12 PM",
      department: "Emergency",
      clinic: "A&E",
      clinician: "Dr. Sarah Adams",
      status: "Completed",
      chiefComplaint: "Road traffic accident",
    },
    {
      id: "3",
      visitNumber: "VST-20260522-009",
      visitType: "IPD",
      visitDate: "22 May 2026, 01:15 PM",
      department: "Surgery",
      clinic: "Ward 4B",
      clinician: "Dr. Michael Brown",
      status: "In Progress",
      chiefComplaint: "Appendicitis",
    },
  ];