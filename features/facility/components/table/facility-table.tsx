import { DataTable } from "@/features/shared-features/data-table/data-table";
import React, { useState } from "react";
import FacilityTableHeader from "./facility-table-header";
import { Facility } from "../../types";
import { SortState } from "@/features/types/sort-state";
import { FacilityTableRow } from "./facility-table-row";
import { TableBody } from "@/components/ui/table";
import { DetailDialog } from "@/features/shared-features/details-dialog";
import { useEntityDetails } from "@/hooks/use-entity-details";
import { createFacilitySections } from "../../facility-details.mapper";

interface FacilityTableProps {
  facilities: Facility[];
  sort: SortState;
  onSortChange: (sort: SortState) => void;
}

export function FacilityTable({
  facilities,
  sort,
  onSortChange,
}: FacilityTableProps) {
  //state for selected facility and action button to open dialog box
  // const [selectedFacility,setSelectedFacility] = useState<Facility | null> (null);
  // const [detailsOpen,setDetailsOpen] = useState(false);

  // //view handler
  // const handleView = (facility: Facility) => {
  //   setSelectedFacility(facility);
  //   setDetailsOpen(true);
  // }

  const {
    open,
    selectedEntity: selectedFacility,
    showDetails,
    hideDetails,
  } = useEntityDetails<Facility>();

  return (
    <>
      <DataTable>
        <FacilityTableHeader sort={sort} onSortChange={onSortChange} />
        <TableBody>
          {facilities.map((facility) => (
            // check facility-table-old.tsx for the previous code
            //NB we're passing the entire facility, not just its ID.
            <FacilityTableRow
              key={facility.id}
              facility={facility}
              onView={showDetails}
            />
          ))}
        </TableBody>
      </DataTable>
      <DetailDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            return;
          }
          hideDetails();
        }}
        title="Facility Details"
        sections={
          selectedFacility ? createFacilitySections(selectedFacility) : []
        }
      />
    </>
  );
}
