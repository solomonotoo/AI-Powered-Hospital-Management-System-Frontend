
import { PermissionGuard } from "@/components/auth/permission-guard";
import { SharedLayout } from "@/components/shared-layout/shared-layout";
import { Facility } from "@/features/facility/components/facility";
import React from "react";

export default function FacilityPage() {
  return (
    // [FEATURE REFERENCE]: Access restricted to users with FACILITY_READ or FACILITY_MANAGE permission
    <PermissionGuard requiredPermissions={["FACILITY_READ", "FACILITY_MANAGE"]}>
      <SharedLayout
        title="Facility"
        description="Manage Facility registration"
        children={<Facility />}
      />
    </PermissionGuard>
  );
}
