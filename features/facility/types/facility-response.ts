
export interface FacilityResponse {
    facilityId: string;
    code: string;
    name: string;
    type: string;
    status: string;
    location: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postalCode?: string;
        country: string;
    };
    contactEmail: string;
    contactPhone: string;
    createdAt: string;
    updatedAt: string;
}