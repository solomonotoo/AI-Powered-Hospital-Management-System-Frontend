import { FacilityTypeCount } from "../types/types";

export interface FacilityWorkSpaceSummary {
  totalFacilities: number;
  activeFacilities: number;
  inactiveFacilities: number;
  //referralPipeline: number;
  //  totalFacilities: number;
  //   activeFacilities: number;
  //   inactiveFacilities: number;
  pendingFacilities: number;
  countType: FacilityTypeCount;
}
