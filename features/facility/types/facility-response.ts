
export interface FacilityResponse {
    id: string;
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
    status: string;
    createdAt: string;
    updatedAt: string;
}