export const userAccessQueryKeys = {
  all: ["user-access"] as const,

  detail: (userId: string) => [...userAccessQueryKeys.all, userId] as const,

  roles: () => [...userAccessQueryKeys.all, "roles"] as const,

  permissionsList: () => [...userAccessQueryKeys.all, "permissions-list"] as const,
};

export const userQueryKeys = {
    all: ["users"] as const,
    detail: (userId: string) => [...userQueryKeys.all, userId] as const,

}

export const userProfileQueryKeys = {
    all: ["user-profile"] as const,
    detail: (userId: string) => [...userProfileQueryKeys.all, userId] as const,
}