import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";


interface DataTableLoadingProps{
    columns:number;
    rows?:number;
}


export function DataTableLoading({
    columns,rows=8
}:DataTableLoadingProps){
    return (
        <TableBody>
            {Array.from({length:rows}).map((_, rowIndex) =>(
                <TableRow key={rowIndex}>
                    {Array.from({ length: columns }).map((_, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
                </TableRow>
            ))}
        </TableBody>
    )
}