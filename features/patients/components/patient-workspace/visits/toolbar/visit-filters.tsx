//this component composes multiple filters

import { VisitFilter } from "./visit-filter";

//data type for visit type and visit status dropdown option
interface VisitFiltersProps {
  visitType: string;
  visitStatus: string;
  onVisitTypeChange: (value: string) => void;
  onVisitStatusChange: (value: string) => void;
}

//visit type options dropdown list
const visitTypeOptions = [
  { label: "All Types", value: "all" },
  { label: "OPD", value: "OPD" },
  { label: "IPD ", value: "IPD" },
  { label: "Emergency ", value: "Emergency" },
];

//visit status options dropdown list
const visitStatusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Scheduled", value: "Scheduled" },
  { label: "Checked In", value: "Checked In" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

export function VisitFilters({
  visitType,
  visitStatus,
  onVisitStatusChange,
  onVisitTypeChange,
}: VisitFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <VisitFilter
        placeholder="Visit Type"
        value={visitType}
        options={visitTypeOptions}
        onValueChange={onVisitTypeChange}
      />
      <VisitFilter
        placeholder="Status"
        value={visitStatus}
        options={visitStatusOptions}
        onValueChange={onVisitStatusChange}
      />
    </div>
  );
}
