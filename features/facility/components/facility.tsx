"use client";

import { useState } from "react";
import { FacilitySummaryCards } from "./facility-summary-cards";
import { FacilityToolbar } from "./toolbar/facility-toolbar";
import { FacilityTable } from "./table/facility-table";
import { SortState } from "@/features/types/sort-state";
import { SectionCard } from "@/features/shared-features/section-card";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { WorkspacePagination } from "@/features/shared-features/workspace-pagination";
import { CreateFacilityDialog } from "./create-facility-dialog";
import { useFacilities } from "../hook/use-facilities";
import { toFacility } from "../mapper/facility-mapper";
import { FacilityQuery } from "../types/facility-query";
import { useFacilitySummary } from "../hook/use-facility-summary";
import { LoadingState } from "@/features/shared-features/loading-state";
import { ErrorState } from "@/features/shared-features/error-state";

export function Facility() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  //open create facility modal
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [page, setPage] = useState(1); //page
  //const [size] = useState(10); //number items per page
  const [pageSize, setPageSize] = useState(10);

  //sorting state
  const [sort, setSort] = useState<SortState>({
    field: "name",
    direction: "asc",
  });

  //NB you can check api.query.ts
  //query for pagination and filtering of the API
  //page: page number (0-indexed)
  //size: number of items per page
  //sort: sort field
  //search: search query  
  const query: FacilityQuery = {
    page: page - 1,
    size: pageSize,
    search: search || undefined,
    sort: `${sort.field},${sort.direction}`,
    category: category !== "all" ? category : undefined,
    status: status !== "all" ? status : undefined,
  }

  const { data: facilities, isLoading: isFacilitiesLoading,
    isError: isFacilitiesError,
    error: facilitiesError, } = useFacilities(query);
  const { data: summary, isLoading: isSummaryLoading,
    isError: isSummaryError,
    error: summaryError, } = useFacilitySummary();


  const facilityData = facilities?.content.map(toFacility) ?? [];

  // Handle successful facility creation
  const handleFacilityCreated = () => {
    // Refresh your facility list here
    console.log("Facility created, refreshing list...");
    // You could refetch data here
  };


  return (
    // <div className="grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 space-y-4 ">
    //   <FacilitySummaryCards summary={summary} />
    //   <FacilityToolbar
    //     search={search}
    //     category={category}
    //     status={status}
    //     onSearchChange={setSearch}
    //     onCategoryChange={setCategory}
    //     onStatusChange={setStatus}
    //   />
    //   <SectionCard>
    //     <FacilityTable
    //       facilities={facilities}
    //       sort={sort}
    //       onSortChange={setSort}
    //     />
    //   </SectionCard>
    // </div>
    <>
      <WorkspaceSection
        summary={
          isSummaryLoading ? (
            <LoadingState message="Loading facility summary..." />
          ) : isSummaryError || !summary ? (
            <div className="flex min-h-[160px] items-center justify-center text-sm text-destructive">
              Unable to load facility summary.
            </div>
          ) : (
            <FacilitySummaryCards summary={summary} />
          )
        }
        toolbar={
          <FacilityToolbar
            search={search}
            category={category}
            status={status}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onStatusChange={setStatus}
            onCreateFacility={() => setOpenCreateDialog(true)}
          />
        }
        footer={
          <WorkspacePagination
            page={page}
            totalPages={facilities?.totalPages ?? 0}
            onPageChange={setPage}
          />
        }
      >
        <SectionCard className="max-w-[85vw] ">
          {isFacilitiesLoading ? (
            <LoadingState message="Loading facilities..." />
          ) : isFacilitiesError ? (
            <ErrorState message="Unable to load facilities." />
          ) : (
            <FacilityTable
              facilities={facilityData}
              sort={sort}
              onSortChange={setSort}
            />
          )}
        </SectionCard>
      </WorkspaceSection>

      <CreateFacilityDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
        onSuccess={handleFacilityCreated}
      />
    </>
  );
}
