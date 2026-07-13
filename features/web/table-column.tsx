"use client";
import React from "react";
import { Patient } from "./patient-data";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown, MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const columns: ColumnDef<Patient>[] = [
  // {
  //   accessorKey: "name",
  //   header: "FullName",
  //   // Access nested object properties
  //   accessorFn: (row) => `${row.name.first} ${row.name.last}`,
  // },
  // { accessorKey: "username", header: "Username" },
  // // add sorting control to email header cell
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // { accessorKey: "age", header: "Age" },
  // { accessorKey: "role", header: "Role" },
  // { accessorKey: "active", header: "Active" },
  // { accessorKey: "created", header: "Created At" },
  {
    accessorKey: "name",
    cell: ({row}) =>{
      const patient = row.original;
      return (
        <div>
          <div className="font-medium">
            {patient.name.first}
            {patient.name.last}
          </div>
          <div className="text-xs text-muted-foreground">
            {patient.email}
          </div>
        </div>
      )

    },
    
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fullname" />
    ),
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  // },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    header: "Actions",
    id: "action",
    cell: ({ row }) => {
      const actionButton = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(actionButton.id)}
            >
              Open Record
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(actionButton.id)}
            >
              New Visit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(actionButton.id)}
            >
              Admit Patient
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(actionButton.id)}
            >
              Prescription
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(actionButton.id)}
            >
              Laboratory
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(actionButton.id)}
            >
              Radiology
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(actionButton.id)}
            >
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              Edit Patient
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              Archive Patient
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
