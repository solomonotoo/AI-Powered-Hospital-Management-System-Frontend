export interface PageResponse<T> {
  content: T[]; // Array of items (facilities, patients, etc.)
  page: number; // Current page number
  size: number; // Items per page
  totalElements: number; // Total items across all pages
  totalPages: number; // Total number of pages
  first: boolean; // Is this the first page?
  last: boolean; // Is this the last page?
}
