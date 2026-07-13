import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

//Why isolate the search?
// Because we'll reuse this exact search behavior in:

// OPD Queue
// Laboratory Orders
// Radiology
// Admissions
// Billing
// Pharmacy

// The placeholder text may change, but the component pattern stays the same.

interface VisitSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function VisitSearch({ value, onChange }: VisitSearchProps) {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input placeholder="Search visit number or complaint..."
      value={value}
      onChange={(e) => onChange(e.target.value)} 
      className="pl-9"
      />
    </div>
  );
}
