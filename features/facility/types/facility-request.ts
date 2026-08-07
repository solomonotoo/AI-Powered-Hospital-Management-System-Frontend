import { FacilityFormValues } from "../schema/facility-schema";

//this is what the backend  api expects

export interface CreateFacilityRequest {
  code: string;
  name: string;
  type: string;
  location: {
    line1: string;
    line2?: string;
    city: string;
    stateOrRegion: string;
    country: string;
    postalCode?: string;
  };
  contactPhone: string;
  contactEmail: string;
}
