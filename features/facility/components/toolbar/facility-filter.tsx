import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOptions {
  label: string;
  value: string;
}

interface FacilityFilterProps {
  placeholder: string;
  options: FilterOptions[];
  value: string;
  onValueChange: (value: string) => void;
}

export function FacilityFilter({
  placeholder,
  options,
  value,
  onValueChange,
}: FacilityFilterProps) {
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
