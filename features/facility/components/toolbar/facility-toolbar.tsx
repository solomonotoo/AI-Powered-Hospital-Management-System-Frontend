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
  onCreateFacility: () => void;
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
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
