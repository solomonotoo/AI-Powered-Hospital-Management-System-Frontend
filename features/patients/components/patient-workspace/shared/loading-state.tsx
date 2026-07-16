import { Loader } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 rounded-xl border bg-card">
      <Loader className="h-8 w-8 animate-spin text-muted-foreground" />

      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
