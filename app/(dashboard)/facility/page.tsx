
import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { Facility } from "@/features/facility/components/facility";
import React from "react";

export default function FacilityPage() {

  return (
    <SharedLayout
      title="Facility"
      description="Manage Facility registration"
      children={<Facility />}
    />
  );
}
