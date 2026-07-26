//sort types for all table columns in patients workspacetabs

export type SortDirection = "asc" | "desc";

export interface SortState {
  field: string; // Current field (column) being sorted
  direction: SortDirection; // Current sort direction (ascending or descending)
}

export interface PaginationState{
  page:number;
  size:number;
  totalElements: number;
  totalPages:number;
}
export type VisitSortField =
  | "visitDate"
  | "visitNumber"
  | "visitType"
  | "status"
  | "department"
  | "clinician";


  