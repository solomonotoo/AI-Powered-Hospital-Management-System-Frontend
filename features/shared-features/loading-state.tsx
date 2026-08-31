import { Loader } from "lucide-react";
import { SkeletonType, Skeletons } from "./skeletons";

interface LoadingStateProps {
  message?: string;
  skeletonType?: SkeletonType;
}

export function LoadingState({ message, skeletonType }: LoadingStateProps) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 rounded-xl border bg-card">
      <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      {skeletonType && <Skeletons skeletonType={skeletonType} />}
      <div className="bg-card">
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
