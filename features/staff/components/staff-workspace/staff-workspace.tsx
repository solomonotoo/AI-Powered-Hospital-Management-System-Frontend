"use client";

import { useState } from "react";
import { StaffSummaryMock, staffDataMock } from "../../staff-mock-data";
import { StaffHeader } from "../profile/staff-header";
import { StaffWorkspaceTabs } from "./staff-workspace-tab";
import { StaffNavigation } from "./staff-navigation";
import { WorkspaceSection } from "@/features/shared-features/workspace-section";
import { StaffOverview } from "../profile/staff-overview";

export function StaffWorkspace() {
  const [activeTab, setActiveTab] = useState("overview");
  const staff = staffDataMock[0];
  const summary = StaffSummaryMock;
  return (
    <div className="mx-0 space-y-6">
      <StaffHeader staff={staff} />
      <StaffNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <StaffWorkspaceTabs activeTab={activeTab} staff={staff} />
      
    </div>
  );
}
