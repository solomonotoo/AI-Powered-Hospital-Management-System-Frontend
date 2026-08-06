//this table is a generic table
// This component only knows how to render rows.
// It doesn't know anything about Visits, Medical Record etc.

import { ReactNode } from "react";
import { Table } from "@/components/ui/table";

// its responsibilities are to
// Show loading, Show error, Show empty, Render children(rows and columns), Render paginationand nothing more.

interface DataTableProps {
  children: ReactNode;
}
export function DataTable({ children }: DataTableProps) {
  return <Table>{children}</Table>;
}
