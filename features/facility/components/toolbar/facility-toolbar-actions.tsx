import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCcw, RefreshCw } from "lucide-react";
import React from "react";

interface FacilityToolbarActionsProps {
  onRefresh: () => void;
  onExport: () => void;
  onNewFactility: () => void;
  canCreateFacility?: boolean;
}

export default function FacilityToolbarActions({
  onRefresh,
  onExport,
  onNewFactility,
  canCreateFacility = true,
}: FacilityToolbarActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" onClick={onRefresh} size="sm">
        <RefreshCw className="w-4 h-4 mr-4" />
        Refresh
      </Button>
      <Button variant="outline" onClick={onExport} size="sm">
        <Download className="w-4 h-4 mr-4" />
        Export
      </Button>
      <Button onClick={onNewFactility} size="sm">
        <Plus className="w-4 h-4 mr-4" />
        Create New
      </Button>
    </div>
  );
}
