import { DataTableRowActions } from "@/features/shared-features/data-table/data-table-row-actions";
import { Staff } from "@/features/staff/types/staff";

import { Download, Eye, Pencil, Trash } from "lucide-react";

interface ScheduleTableRowActionsProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onView: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
  onExport: (staff: Staff) => void;
}

export function ScheduleTableRowActions({
  staff,
  onEdit,
  onView,
  onDelete,
  onExport,
}: ScheduleTableRowActionsProps) {
  return (
    <DataTableRowActions
      actions={[
        {
          label: "View",
          icon: <Eye className="h-4 w-4" />,
          onClick: () => onView(staff),
        },
        {
          label: "Edit",
          icon: <Pencil className="h-4 w-4" />,
          onClick: () => onEdit(staff),
        },
        {
          label: "Delete",
          icon: <Trash className="h-4 w-4" />,
          onClick: () => onDelete(staff),
        },
        {
          label: "Export",
          icon: <Download className="h-4 w-4" />,
          onClick: () => onExport(staff),
        },
      ]}
    />
  );
}
