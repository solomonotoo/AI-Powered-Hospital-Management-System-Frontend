import { Card } from "@/components/ui/card";
import { StaffSearch } from "./staff-search";

interface StaffToolbarProps {
    search: string;
    onSearchChange: (search: string) => void;
}

export function StaffToolbar({ search, onSearchChange }: StaffToolbarProps) {
    return (
        <Card className="flex items-center justify-between px-6 py-3">
            <StaffSearch value={search} onChange={onSearchChange} />
        </Card>
    )
}