import { components } from "@/lib/api/generated/openapi-types";



// export interface UsersSummaryCardTypes {
//   totalUsers: number;
//   activeUsers: number;
//   mfaEnabledUsers: number;
//   lockedUsers: number;
// }



// export interface Users {
//   id: string;
//   firstName: string;
//   lastName: string;
//   loginEmail: string;
//   passwordHash: string;
//   mfaEnabled: boolean;
//   mustChangePassword: boolean;
//   lastLoginAt: string;
//   role: string;
//   status: string;
//   audit: {
//     createdAt: string;
//     updatedAt: string;
//     createdBy: string;
//     updatedBy: string;
//   };
// }

//the above is replaced with generated OpenAPI types

export type UsersSummaryCardResponse =
  components["schemas"]["UserSummaryCardResponse"];

export type UserSummaryResponse =
  components["schemas"]["UserSummaryResponse"];

export type PagedUsersResponse =
  components["schemas"]["PagedResponseUserSummaryResponse"];

// OpenAPI types for user credential provisioning
export type CreateCredentialRequest =
  components["schemas"]["CreateCredentialRequest"];

export type CreateCredentialResponse =
  components["schemas"]["CreateCredentialResponse"];

