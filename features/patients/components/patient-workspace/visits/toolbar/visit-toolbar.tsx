"use client";

import { useState } from "react";
import { VisitSearch } from "./visit-search";
import { VisitFilters } from "./visit-filters";
import { VisitToolbarActions } from "./visit-toolbar-actions";

interface VisitToolbarProps {
  search: string;
  visitType: string;
  visitStatus: string;
  onSearchChange: (value: string) => void;
  onVisitTypeChange: (value: string) => void;
  onVisitStatusChange: (value: string) => void;
}

export function VisitToolbar({
  search,
  visitType,
  visitStatus,
  onSearchChange,
  onVisitTypeChange,
  onVisitStatusChange,
}: VisitToolbarProps) {
  //   const [search, setSearch] = useState(""); //moved to visit-tab.tsx

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
      <VisitSearch value={search} onChange={onSearchChange} />

      <div className="flex items-center gap-2">
        <VisitFilters
          visitType={visitType}
          visitStatus={visitStatus}
          onVisitTypeChange={onVisitTypeChange}
          onVisitStatusChange={onVisitStatusChange}
        />

        <VisitToolbarActions
          onRefresh={() => {
            console.log("Refresh visits");
          }}
          onExport={() => {
            console.log("Export visits");
          }}
          onNewVisit={() => {
            console.log("Create visits");
          }}
        />
      </div>
    </div>
  );
}
