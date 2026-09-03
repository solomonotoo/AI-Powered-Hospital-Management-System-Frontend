import { PageQuery } from "@/features/types/api-query";

// export interface UsersQuery extends PageQuery {
//   role?: string;
//   status?: string;
//   department?: string;
// }
export type UserSortField =
  | "lastLoginAt"
  | "loginemail"
  | "createdAt";

export interface UsersQuery {
  search?: string;
  active?: boolean;
  mfaEnabled?: boolean;
  sortBy?: UserSortField;
  sortDir?: "asc" | "desc";
  page?: number;
  size?: number;

}
