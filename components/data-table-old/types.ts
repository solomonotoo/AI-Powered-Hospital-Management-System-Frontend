//NB every component that will use the table data will import this types

import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData,TValue>{
    columns: ColumnDef<TData,TValue>[]; //array of table columns
    data: TData[]; //array of table data
    loading?: boolean;
    onRowClick?: (row:TData) => void; //makes each table row clickable
}