import { DataTableRowActions } from "@/features/shared-features/data-table/data-table-row-actions";
import { Staff } from "../../types/staff";
import { Download, Eye, Pencil, Trash } from "lucide-react";

interface StaffTableRowActionsProps {
    staff: Staff;
    onEdit: (staff: Staff) => void;
    onView: (staff: Staff) => void;
    onDelete: (staff: Staff) => void;
    onExport: (staff: Staff) => void;

}

export function StaffTableRowActions(
    { staff, onEdit, onView, onDelete, onExport }
        : StaffTableRowActionsProps) {
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