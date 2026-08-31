import { PageQuery } from "@/features/types/api-query";

export interface UsersQuery extends PageQuery {
  role?: string;
  status?: string;
  department?: string;
}
