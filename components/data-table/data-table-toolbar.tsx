//this componet is for search box

import { Input } from "../ui/input";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DataTableToolbar({ search, onSearchChange }: Props) {
  return (
    <div className="flex items-center justify-between py-4">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
