export interface UsersSummaryCardTypes {
  totalUsers: number;
  activeUsers: number;
  mfaEnabledUsers: number;
  lockedUsers: number;
}

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  loginEmail: string;
  passwordHash: string;
  mfaEnabled: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string;
  role: string;
  status: string;
  audit: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  };
}
