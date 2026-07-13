// Instead of creating a separate component for every dropdown (visit-type-filter.tsx,
// visit-status-filter.tsx, etc.), I'd create one reusable filter component that accepts options.
// We'll be able to reuse it in Laboratory, Billing, Pharmacy, Documents, and other modules.

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//so this component will be a generic reusable filter

interface FilterOptions {
  //this type is something like data types of selection options
  label: string;
  value: string;
}

interface VisitFilterProps {
  //also this one is like data types for visit dropdown options for filters
  placeholder: string;
  value: string;
  options: FilterOptions[];
  onValueChange: (value: string) => void;
}

export function VisitFilter({
  placeholder,
  value,
  options,
  onValueChange,
}: VisitFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
