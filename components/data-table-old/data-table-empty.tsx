//this component will be this only on empty table search result

import { FileSearch } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";

//only available to the content of this file
interface Props {
  title?: string;
  description?: string;
}

export function DataTableEmpty({
  title = "No records found",
  description = "There is nothing to display.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      {/* <FileSearch className="mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p> */}
      <TableRow>
        <FileSearch className="mb-4 h-12 w-12 text-muted-foreground" />
        <TableCell
          className="h-2 text-center">
          {title}
        </TableCell>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </TableRow>
    </div>
  );
}
