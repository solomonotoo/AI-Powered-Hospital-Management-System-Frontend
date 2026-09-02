// instead of typing "/patients" everywhere, this file help centralize all api endpoints

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    CREDENTIALS: "/auth/credentials",
  },
  STAFF: {
    ROOT: "/staff",
    BY_ID: (id: string) => `/staff/${id}`,
    SEARCH: "/staff/search",
    SUMMARY: "/staff/summary"
  },
  FACILITIES: {
    ROOT: "/facilities",
    BY_ID: (id: string) => `/facilities/${id}`,
    // SEARCH: "/facilities/search",
    SUMMARY: "/facilities/summary"
  },
  PATIENTS: {
    ROOT: "/patients",
    BY_ID: (id: string) => `/patients/${id}`,
    SEARCH: "/patients/search",
    VISITS: (id: string) => `/patients/${id}/visits`,
  },
  VISITS: {
    ROOT: "/visits",
  },
  ADMISSIONS: {
    ROOT: "/admissions",
  },
  LABS: {
    ROOT: "/labs",
  },
  MEDICAL_RECORDS: {
    ROOT: "/medical-records",
  },

  USERS: {
    ROOT: "/users",
    BY_ID: (id: string) => `/users/${id}`,
    SEARCH: "/users/search",
    SUMMARY: "/users/summary"
  }
} as const;

//now the service method becomes much cleaner
// eg
// api.get(API.PATIENTS.ROOT)

// api.get(API.PATIENTS.BY_ID(id))
