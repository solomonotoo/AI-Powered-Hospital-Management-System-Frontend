import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FacilitySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function FacilitySearch({ value, onChange }: FacilitySearchProps) {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search by facility name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
