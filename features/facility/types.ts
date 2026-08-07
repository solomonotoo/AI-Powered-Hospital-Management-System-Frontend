import z from "zod";
import { facilityStatus, facilityType } from "./schema/enums";

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

// export interface Facility {
//   id: string;
//   facilityName: string;
//   category: string;
//   region: string;
//   status: string;
// }
