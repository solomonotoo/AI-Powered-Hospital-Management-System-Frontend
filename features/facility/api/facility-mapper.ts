import { FacilityFormValues } from "../schema/facility-schema"
import { CreateFacilityRequest } from "../types/facility-request"
import { FacilityResponse } from "../types/facility-response"
import { Facility } from "../types"


export function toCreateFacilityRequest(values: FacilityFormValues): CreateFacilityRequest {
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
    }
}

export function toFacility(response: FacilityResponse): Facility {
    return {
        id: response.id,
        code: response.code,
        name: response.name,
        type: response.type as any,
        status: response.status as any,
        location: {
            line1: response.location.line1,
            line2: response.location.line2 ?? "",
            city: response.location.city,
            state: response.location.stateOrRegion,
            country: response.location.country,
            postalCode: response.location.postalCode,
        },
        contactPhone: response.contactPhone,
        contactEmail: response.contactEmail,
    }
}