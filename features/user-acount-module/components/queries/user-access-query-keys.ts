export const userAccessQueryKeys = {
  all: ["user-access"] as const,

  detail: (userId: string) => [...userAccessQueryKeys.all, userId] as const,

  roles: () => [...userAccessQueryKeys.all, "roles"] as const,

  //   roleCatelog: () => ["roles"] as const,
  //   permissions: (userId: string) =>
  //     [...userAccessQueryKeys.all, userId, "permissions"] as const,
};
