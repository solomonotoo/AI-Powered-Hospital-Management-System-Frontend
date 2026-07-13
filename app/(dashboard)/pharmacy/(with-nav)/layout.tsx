import PharmacyNav from "@/features/pharmacy/components/pharmacy-nav";
import React, { ReactNode } from "react";

export default function PharmacyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl">Pharmacy Management</h1>
        <p>Manage medicines,prescriptions and inventory</p>
      </div>
      <PharmacyNav />
      {children}
    </div>
  );
}
