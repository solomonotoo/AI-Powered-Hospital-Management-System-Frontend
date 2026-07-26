import React from "react";
import { FacilityFilter } from "./facility-filter";

interface FacilityFiltersProps{
  category:string;
  status:string;
  onCategoryChange:(value:string) => void;
  onStatusChange:(value:string) => void;
}

//category and status dropdown
const categoryOptions = [
  { label: "All Hospital", value: "all" },
  { label: "Teaching Hospital", value: "Teaching Hospital" },
  { label: "Regional Hospital", value: "Regional Hospital" },
  { label: "District Hospital", value: "District Hospital" },
  { label: "Polyclinic Hospital", value: "Polyclinic Hospital" },
  { label: "Health Center", value: "Health Center" },
  { label: "CHIPS ", value: "CHIPS " },
  { label: "Maternity Home ", value: "Maternity Home " },
];

const statusOptions = [
  { label: "All Statuses ", value: "all" },
  { label: "Active ", value: "Active" },
  { label: "Inactive ", value: "Inactive" },
  { label: "Pending ", value: "Pending" },
];

export function FacilityFilters({
 
  category,
  status,
  onCategoryChange,
  onStatusChange,
}: FacilityFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <FacilityFilter
        placeholder="Status"
        options={statusOptions}
        value={status}
        onValueChange={onStatusChange}
      />

      <FacilityFilter
        placeholder="Category Type"
        options={categoryOptions}
        value={category}
        onValueChange={onCategoryChange}
      />
    </div>
  );
}
