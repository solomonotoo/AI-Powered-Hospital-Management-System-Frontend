import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StaffToolbarActionsProps {
    onExport: () => void;
    onNewStaff: () => void;
    canCreateStaff?: boolean;
}

export function StaffToolbarActions({ onExport, onNewStaff, canCreateStaff = true }: StaffToolbarActionsProps) {
    return (
        <div className="flex justify-end flex-wrap items-center gap-2">

            <Button onClick={onExport} size="sm">
                <Download className="w-4 h-4 mr-4" />
                Export
            </Button>
            {canCreateStaff && (
                <Button onClick={onNewStaff} size="sm">
                    <Plus className="w-4 h-4 mr-4" />
                    Add Staff
                </Button>
            )}
        </div>
    )
}