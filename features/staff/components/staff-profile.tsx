"use client";
import { useState } from "react";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { StaffSummaryCards } from "./staff-summary-cards";
import { staffDataMock, StaffSummaryMock } from "../staff-mock-data";
import { SectionCard } from "@/features/shared-features/section-card";
import { StaffToolbar } from "./toolbar/staff-toolbar";
import StaffTable from "./table/staff-table";



export function StaffProfile() {
    const staffSummary = StaffSummaryMock;
    const staff = staffDataMock;

    const [search, setSearch] = useState("");
    return (
        <WorkspaceSection
            summary={<StaffSummaryCards summary={staffSummary} />}
            toolbar={<StaffToolbar search={search} onSearchChange={setSearch} />}>

            <SectionCard>
                <StaffTable staff={staff} />
            </SectionCard>
        </WorkspaceSection>
    );
}