"use client";
import { DataTable } from "@/components/data-table-old/data-table";
import { DataTableToolbar } from "@/components/data-table-old/data-table-toolbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkspacePagination } from "@/features/shared-features/workspace-pagination";
//import { DataTable } from "@/features/web/data-table";
//import { Patients } from "@/features/web/patient-data";
import { columns } from "@/features/web/table-column";
import { Patients } from "@/features/web/user-data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PatientList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
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
        <DataTableToolbar
          search={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <DataTable
          columns={columns}
          data={Patients}
          onRowClick={(patient) => {
            console.log(patient);
            router.push(`/patients/${patient.id}`);
          }}
        />

        {/* <DataTablePagination page={1} pageSize={20} total={200} /> */}
        <WorkspacePagination page={10} totalPages={20} onPageChange={setPage} />
      </CardContent>
    </Card>
  );
}
