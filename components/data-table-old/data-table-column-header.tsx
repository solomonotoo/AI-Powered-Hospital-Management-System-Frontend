// This component will handle:

import { Column } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

// sorting icons (↑ ↓ ↕)
// hide/show column
// consistent header styling
// accessibility
// reusable sorting behavior

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted(); //sort the columns

  return (
    <Button
      variant="ghost"
      className="ml-3 h-8"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span>{title}</span>
      {/* sort icons */}
      {sorted === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : sorted === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-4 h-4 w-4 opacity-50" />
      )}
    </Button>
  );
}
