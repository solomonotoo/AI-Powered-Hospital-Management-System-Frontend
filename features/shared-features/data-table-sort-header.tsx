import { Button } from "@/components/ui/button";
import { SortState, VisitSortField } from "@/features/patients/types/table";
import { ArrowDownUp } from "lucide-react";

// Why this design?
// Instead of writing:
// <TableHead>
//    onClick...
// </TableHead>

// inside every table...
// We'll simply write:
// <TableHead>
//     <DataTableSortHeader
//         label="Visit Date"
//         field="visitDate"
//         ...
//     />
// </TableHead>

// Later it can be reused in Billing, laboratory etc no duplicate sorting logic



//interface for table sort header
interface DataTableSortHeaderProps<T extends string> {
  label: string; // Text displayed in the column header
  field: T; // Field this header sorts by
  sort: SortState; // Current sorting state
  onSortChange: (sort: SortState) => void; // Called when the sort changes
}

export function DataTableSortHeader<T extends string>({
  label,
  field,
  sort,
  onSortChange,
}: DataTableSortHeaderProps<T>) {
  const handleClick = () => {
    if (sort.field !== field) {
      onSortChange({
        field,
        direction: "asc",
      });
      return;
    }

    onSortChange({
      field,
      direction: sort.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <Button variant="ghost" className="h-auto p-0 font-semibold" onClick={handleClick}>
      {label} <ArrowDownUp className="ml-2 h-4 w-4" />{" "}
    </Button>
  );
}
