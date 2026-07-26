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

interface MedicalRecordsFilterProps {
  //also this one is like data types for visit dropdown options for filters
  placeholder: string;
  value: string;
  options: FilterOptions[];
  onValueChange: (value: string) => void;
}

export function MedicalRecordsFilter({
  placeholder,
  value,
  options,
  onValueChange,
}: MedicalRecordsFilterProps) {
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
