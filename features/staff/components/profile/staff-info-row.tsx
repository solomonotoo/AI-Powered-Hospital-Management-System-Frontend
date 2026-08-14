import { cn } from "@/lib/utils";


interface StaffInfoRowProps{
    label: string;
    value?: React.ReactNode;
    className?: string;
}

export function StaffInfoRow({
    label,value,className,
}:StaffInfoRowProps){

    return(
        <div className={cn("flex items-center justify-between borer-b pb-2 last:border-none",className)}>
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-right">{value ?? "--"}</span>
        </div>
    )
}