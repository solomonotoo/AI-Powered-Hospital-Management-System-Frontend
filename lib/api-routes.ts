// instead of typing "/patients" everywhere, this file help centralize all api endpoints

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
  },
  FACILITY: {
    ROOT: "/facilities",
    BY_ID: (id: string) => `/facilities/${id}`,
    SEARCH: "/facilities/search",
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
} as const;

//now the service method becomes much cleaner
// eg
// api.get(API.PATIENTS.ROOT)

// api.get(API.PATIENTS.BY_ID(id))
