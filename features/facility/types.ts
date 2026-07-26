export interface Facility {
  id: string;
  code: string;
  name: string;
  type: string;
  location: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contactPhone: string;
  contactEmail: string;
  status: string;
}

// export interface Facility {
//   id: string;
//   facilityName: string;
//   category: string;
//   region: string;
//   status: string;
// }
