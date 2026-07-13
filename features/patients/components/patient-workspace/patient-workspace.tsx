"use client";

import { useParams } from "next/navigation";
import { PatientHeader } from "./patient-header";
import { usePatient } from "../../hooks/use-patient";
import { PatientSummaryMock, Patients } from "@/features/web/user-data";
import { PatientSummaryCards } from "./patient-summary-cards";
import { PatientNaviation } from "./patient-navigation";
import { useState } from "react";
import { WorkspaceTabs } from "./workspace-tabs";

export function PatientWorkspace() {
  const patient = Patients[0]; //static data it will be replace with data from api later
  const summary = PatientSummaryMock; //mocked data it will later be replaced
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="space-y-6">
      <PatientHeader patient={patient} />

      <PatientSummaryCards summary={summary} />
      <PatientNaviation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* refer to patient-workspace-old.tsx for the previous code to have
      an idea of what is going before  workspacetabs */}

      <WorkspaceTabs activeTab={activeTab} patient={patient} />
    </div>
  );
}
