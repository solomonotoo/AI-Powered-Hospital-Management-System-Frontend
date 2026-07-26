// Notice this is not a backend DTO.
// It is purely a UI state.
// That is why it belongs in src/types, not inside features.

export type SortDirection = "asc" | "desc";

export interface SortState {
    field: string; // Current field (column) being sorted
    direction: SortDirection; // Current sort direction (ascending or descending)
  }