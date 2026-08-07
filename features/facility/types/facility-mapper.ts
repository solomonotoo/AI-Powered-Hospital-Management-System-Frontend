import { FacilityFormValues } from "../schema/facility-schema";
import { CreateFacilityRequest } from "./facility-request";



export function toCreateFacilityRequest(values:FacilityFormValues): CreateFacilityRequest{
    return{
        code: values.code,
        name: values.name,
        type: values.type,
        location:{
            line1: values.location.line1,
            line2: values.location.line2,
            city: values.location.city,
            stateOrRegion: values.location.state,
            country: values.location.country,
            postalCode: values.location.postalCode,
        },
        contactPhone: values.contactPhone,
        contactEmail: values.contactEmail
    }
}