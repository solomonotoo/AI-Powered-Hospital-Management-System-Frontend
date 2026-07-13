"use client";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { DataTable } from "@/features/web/data-table";
import { Patients } from "@/features/web/patient-data";
import { columns } from "@/features/web/table-column";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PatientList() {
  const router = useRouter();
  const [searchQuery,setSearchQuery] = useState('');
  return (
    // <Card className="ring-0">
    //   <CardHeader>
    //     <CardTitle>All patients</CardTitle>
    //     <CardDescription>
    //       Manage and search all registered patients.
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="text-sm text-muted-foreground">
    //     <DataTable columns={columns} data={Patients} onRowClick={(patient)=>{router.push(`/patients/${patient.id}`)}} />

    //   {/* <DataTableToolbar />
    //   <DataTable />
    //   <DataTablePagination /> */}
    //   </CardContent>
    // </Card>

    <Card className="ring-0">
      <CardHeader>
        <CardTitle>All patients</CardTitle>
        <CardDescription>
          Manage and search all registered patients.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {/* <DataTableToolbar search="" onSearchChange={()=>null}/>
    columns={columns}
    data={patients.content}
    page={patients.page}
    pageSize={patients.size}
    total={patients.totalElements}
    loading={isLoading}
    onPageChange={setPage}
    onSearch={setSearch}
    onSort={setSort} */}
        <DataTableToolbar search={searchQuery} onSearchChange={setSearchQuery}/>
        <DataTable
          columns={columns}
          data={Patients}
          page={1}
          pageSize={20}
          total={200}
          loading={true}
          onPageChange={null}
          onSearch={null}
          onSort={null}
          onRowClick={(patient) => {
            console.log(patient)
            router.push(`/patients/${patient.id}`);
          }}
        />

        <DataTablePagination page={1} pageSize={20} total={200} />
      </CardContent>
    </Card>
  );
}
