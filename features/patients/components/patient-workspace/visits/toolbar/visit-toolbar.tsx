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
  onVisitTypeChage: (value: string) => void;
  onVisitStatusChange: (value: string) => void;
}

export function VisitToolbar({
  search,
  visitType,
  visitStatus,
  onSearchChange,
  onVisitTypeChage,
  onVisitStatusChange,
}: VisitToolbarProps) {
  //   const [search, setSearch] = useState(""); //moved to visit-tab.tsx

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <VisitSearch value={search} onChange={onSearchChange} />

      <div className="flex items-center gap-2">
        <VisitFilters
          visitType={visitStatus}
          visitStatus={visitStatus}
          onVisitTypeChange={onVisitTypeChage}
          onVisitStatusChange={onVisitStatusChange}
        />

        <VisitToolbarActions 
          onRefresh={()=>{console.log("Refresh visits")}}
          onExport={()=>{console.log("Export visits")}}
          onNewVisit={()=>{console.log("Create visits")}}
        
        />
      </div>
    </div>
  );
}
