import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

//this component is responsible for row action
interface VisitActionsProps {
  visitId: string;
}

export function VisitActions({ visitId }: VisitActionsProps) {
  return (
    //For now it logs the visit ID. Later we'll replace it with Next.js routing to the encounter page.
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        console.log(visitId);
      }}
    >
      <Eye className="mr-2 h-4 w-4" />
      Open
    </Button>
  );
}
