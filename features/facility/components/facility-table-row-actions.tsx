import { Button } from "@/components/ui/button";
import { DataTableRowActions } from "@/features/shared-features/data-table/data-table-row-actions";
import { Eye, Pencil } from "lucide-react";
import { Facility } from "../types";

//this component is responsible for the action button for each row
interface FacilityActionsProps {
  facility: Facility;
  onView: (facility:Facility) => void;
}

export function FacilityTableRowActions({ facility,onView }: FacilityActionsProps) {
  return (
    //For now it logs the visit ID. Later we'll replace it with Next.js routing to the encounter page.
    <DataTableRowActions
      actions={[
        {
          label: "View",
          icon: <Eye className="h-4 w-e" />,
          onClick: () => onView(facility),
        },
        {label:"Edit",
        icon: <Pencil className="h-4 w-4" />,
        onClick: () =>{
          console.log("Edit", facility);
        }

      }
      ]}
    
    />
  );
}
