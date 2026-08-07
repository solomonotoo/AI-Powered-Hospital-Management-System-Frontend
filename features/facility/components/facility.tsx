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
import { useFacilitySummary } from "../hook/use-facility-summary";
import { toFacility } from "../api/facility-mapper";

export function Facility() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  //open create facility modal
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [page, setPage] = useState(1); //page
  const [pageSize, setPageSize] = useState(10);

  //sorting state
  const [sort, setSort] = useState<SortState>({
    field: "code",
    direction: "desc",
  });

  // Fetch real summary data from the API (with fallback to mock data)
  const { data: summary, isLoading: isSummaryLoading } = useFacilitySummary();

  // Fetch real facilities list from the API based on search, pagination, and sorting
  const { data: facilitiesPage, isLoading: isListLoading } = useFacilities({
    page: page - 1, // API pagination is 0-indexed
    size: pageSize,
    search: search || undefined,
    sort: sort.field ? `${sort.field},${sort.direction}` : undefined,
  });

  // Map API FacilityResponse model to Facility UI model
  const facilityData = facilitiesPage?.content.map(toFacility) || [];
  const totalPages = facilitiesPage?.totalPages || 1;

  // Handle successful facility creation
  const handleFacilityCreated = () => {
    console.log("Facility created, list refreshing automatically via query invalidation...");
  };

  return (
    <>
      <WorkspaceSection
        summary={summary ? <FacilitySummaryCards summary={summary} /> : null}
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
            totalPages={totalPages}
            onPageChange={setPage}
          />
        }
      >
        <SectionCard className="max-w-[85vw] ">
          {isListLoading ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              Loading facilities...
            </div>
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
