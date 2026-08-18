import { FacilityWorkSpaceSummary } from "../components/facility-workspace-summary";
import { FacilityFormValues } from "../schema/facility-schema";
import { CreateFacilityRequest } from "../types/facility-request";
import { FacilityResponse } from "../types/facility-response";
import { Facility } from "../types/types";

//Data Transformation- data mapping
//Thus maps API field to UI field

// Why this exists: The API might use stateOrRegion but your UI uses state.
// This keeps your UI code clean and decoupled from API changes.

export function toCreateFacilityRequest(
  values: FacilityFormValues
): CreateFacilityRequest {
  return {
    code: values.code,
    name: values.name,
    type: values.type,
    location: {
      line1: values.location.line1,
      line2: values.location.line2,
      city: values.location.city,
      stateOrRegion: values.location.state,
      country: values.location.country,
      postalCode: values.location.postalCode,
    },
    contactPhone: values.contactPhone,
    contactEmail: values.contactEmail,
    status: values.status,
  };
}

//API RESPONSE -> UI MODEL
//Thus maps API field to UI field
export function toFacility(response: FacilityResponse): Facility {
  return {
    id: response.facilityId,
    code: response.code,
    name: response.name,
    type: response.type as any,
    status: response.status as any,
    location: {
      line1: response.location.line1,
      line2: response.location.line2 ?? "",
      city: response.location.city,
      state: response.location.state,
      country: response.location.country,
      postalCode: response.location.postalCode,
    },
    contactPhone: response.contactPhone,
    contactEmail: response.contactEmail ?? "",
  };
}

export function toWorkSpaceSummary(response: FacilityWorkSpaceSummary) {
  return {
    totalFacilities: response.totalFacilities,
    activeFacilities: response.activeFacilities,
    inactiveFacilities: response.inactiveFacilities,
    pendingFacilities: response.pendingFacilities,
    countType: response.countType,
  };
} 
