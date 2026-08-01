import { useState } from "react";
import { FacilityFilters } from "./facility-filters";
import { FacilitySearch } from "./facility-search";
import FacilityToolbarActions from "./facility-toolbar-actions";

interface FacilityToolbarProps {
  search: string;
  category: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCreateFacility:() => void;
}

export function FacilityToolbar({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onCreateFacility,
}: FacilityToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center">
      <FacilitySearch value={search} onChange={onSearchChange} />
      <FacilityFilters
        category={category}
        status={status}
        onCategoryChange={onCategoryChange}
        onStatusChange={onStatusChange}
      />
      <FacilityToolbarActions
        onRefresh={() => {
          console.log("Refresh facility");
        }}
        onExport={() => {
          console.log("Export facility");
        }}
        onNewFactility={onCreateFacility}
      />
    </div>
  );
}
