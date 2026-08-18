import z from "zod";
import { facilityStatus, facilityType } from "../schema/enums";

export type FacilityType = z.infer<typeof facilityType>;
export type FacilityStatus = z.infer<typeof facilityStatus>;

export interface Facility {
  id: string;
  code: string;
  name: string;
  type: FacilityType;
  location: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
  };
  contactPhone: string;
  contactEmail: string;
  status: FacilityStatus;
}

//for facility summary
//count type can contain different types of facilities
//eg. {
//   "TEACHING_HOSPITAL": 2,
//   "GENERAL_HOSPITAL": 5,
//   "CLINIC": 3
// } etc.
//and the number of facilities of each type 
//is better than hardcoding TEACHING_HOSPITAL: number;
export interface FacilityTypeCount {
  [facilityType: string]: number;
}

export interface FacilitySummary {
  totalFacilities: number;
  activeFacilities: number;
  inactiveFacilities: number;
  pendingFacilities: number;
  countType: FacilityTypeCount;
}

