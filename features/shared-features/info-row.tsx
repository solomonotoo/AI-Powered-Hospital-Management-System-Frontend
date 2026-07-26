import { cn } from "@/lib/utils";


interface InfoRowProps{
    label: string;
    value?: React.ReactNode;
    className?: string;
}

export function InfoRow({
    label,value,className,
}:InfoRowProps){

    return(
        <div className={cn("flex items-center justify-between borer-b pb-2 last:border-none",className)}>
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-right">{value ?? "--"}</span>
        </div>
    )
}