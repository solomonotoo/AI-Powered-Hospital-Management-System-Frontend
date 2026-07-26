
import { mockVisits } from "./patient-visits-mocked-data";
import { VisitTable } from "./visit-table";
import { VisitSummaryCards } from "./visit-summary-cards";
import { VisitToolbar } from "./toolbar/visit-toolbar";
import { useMemo, useState } from "react";
import { Patient } from "@/features/patients/types/patient";
import { usePatientVisits } from "@/features/patients/hooks/use-patient-visit";;
import { DataTableFooter } from "../../../../shared-features/data-table-footer";
import { SortState } from "@/features/patients/types/table";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { WorkspacePagination } from "@/features/shared-features/workspace-pagination";
import { SectionCard } from "@/features/shared-features/section-card";

//the VisitTabProps is needed because we will use patient.id
interface VisitTabProps {
  patient: Patient;
}

//unlike the table the visit tab component will acts as the container for the entire tab
export function VisitTab({ patient }: VisitTabProps) {
  const [search, setSearch] = useState("");
  const [visitType, setVisitType] = useState("all");
  const [visitStatus, setVisitStatus] = useState("all");
  const [page, setPage] = useState(1); //page
  //const [size] = useState(10); //number items per page
  const [pageSize, setPageSize] = useState(10);
  const visits = mockVisits; //mocked data, it will be replace will data from the backend api

  //sorting state
  const [sort, setSort] = useState<SortState>({
    field: "visitDate",
    direction: "desc",
  });

  //we're contverting all to undefined so unneccessary query paramters are not send to the backend
  //actual data
  //this code will replace const visits = mockVisits but commented out because backend is not ready
  // const { data, isLoading, isError, refetch } = usePatientVisits({
  //   patientId: patient.id,

  //   search,
  //   visitType: visitType === "all" ? undefined : visitType,
  //   status: visitStatus === "all" ? undefined : visitStatus,
  //   page,
  //   //size,
  //   pageSize,
  // });

  // const visits = useMemo(
  //   () => data?.visits ?? [],
  //   [data]
  // );

  //NB since the search state has been moved from visit-toolbar.tsx to visit-tab.tsx.
  // component now controls the search state

  //search state to filter list
  // Why useMemo?
  // Because eventually you'll be filtering:
  // hundreds of visits
  // thousands of lab results
  // medications
  // invoices
  // documents

  //comment out const filteredVisits = useMemo(() => {...} once mockedData is deleted and const { data, isLoading, isError, refetch } = usePatientVisits...
  //is uncommented

  // We only recompute when the search changes.
  const filteredVisits = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase();

    return visits.filter((visit) => {
      const matchesSearch =
        !keyword ||
        visit.visitNumber.toLowerCase().includes(keyword) ||
        visit.chiefComplaint?.toLowerCase().includes(keyword);

      const matchesType = visitType === "all" || visit.visitType === visitType;

      const matchesStatus =
        visitStatus === "all" || visit.status === visitStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, visitType, visitStatus]);

  // 1. ADD THIS: Handle the loading state
  // if (isLoading) {
  //   return <LoadingState message="Loading patient visits..." />;
  // }

  // // 2. ADD THIS: Handle the error state
  // if (isError) {
  //   return <ErrorState message="Unable to load patient visits." onRetry={refetch} />;
  // }

  //for pagination
  // const totalPages = useMemo(() => {
  //   if (!data) {
  //     return 1;
  //   }
  //   return Math.ceil(data.total / size);
  // }, [data, size]);

  return (
    //NB check visit-tab-old1.tsx to see the previous before the use WorkspaceSection
    <WorkspaceSection
      summary={<VisitSummaryCards visits={filteredVisits} />}
      toolbar={
        <VisitToolbar
          search={search}
          visitType={visitType}
          visitStatus={visitStatus}
          onSearchChange={setSearch}
          onVisitTypeChange={setVisitType}
          onVisitStatusChange={setVisitStatus}
        />
      }
      footer={
        <WorkspacePagination
          page={10}
          // totalPages={totalPages}
          totalPages={20}
          onPageChange={setPage}
        />
        // <DataTableFooter
        //   page={page}
        //   pageSize={pageSize}
        //   //totalRecords={data?.total ?? 0}
        //   totalRecords={200}
        //   onPageChange={setPage}
        //   onPageSizeChange={(size) => {
        //     setPageSize(size);
        //     setPage(1);
        //   }}
        // />
      }
    >
      {/*
        uncomment <VisitSummaryCards visits={visits} /> and  <VisitTable visits={visits} />
        and comment <VisitSummaryCards visits={filteredVisits} /> and <VisitTable visits={filteredVisits} />
        after const visits = useMemo(...) is uncommented

      */}
      {/* <VisitSummaryCards visits={visits} /> */}

      <SectionCard title="Patient Visits">
        {/* <VisitTable visits={visits} /> */}
        <VisitTable
          visits={filteredVisits}
          sort={sort}
          onSortChange={setSort}
        />
      </SectionCard>
    </WorkspaceSection>
  );
}
