import { PaginationState, SortState } from "@/features/patients/types/table";
import { ReactNode } from "react";

export interface DataTableColumn<T>{
    id:string;
    label:string;
    sortable?:boolean;
    className?:string;
    headerClassName?:string;
    cell: (row: T) => ReactNode;
}

export interface DataTableProps{
    loading?:boolean;
    error?:boolean;
    isEmpty?:string;
    emptyTitle?:string;
    emptyDescription?:string;
    pagination?:PaginationState;
    onPageChange?:(page:number) => void;
    children:ReactNode;
}