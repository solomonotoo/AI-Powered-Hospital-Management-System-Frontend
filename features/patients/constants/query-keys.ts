export const patientKeys = {
    all: ["patients"] as const,
    lists: () => [...patientKeys.all, "list"] as const,
    list: (filters: unknown) => [...patientKeys.lists(), filters] as const,
    detail: (id: string) => [...patientKeys.all, id] as const,
  };