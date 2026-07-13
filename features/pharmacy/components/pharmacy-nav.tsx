import { SectionTab } from "@/features/layout/section-tabs";
import React from "react";

const PHARMACY_TABS:SectionTab[] = [
  { label: "Medicines", href: "/pharmacy/medicines" },
  { label: "Prescriptions", href: "/pharmacy/prescriptions" },
  { label: "Intentory", href: "/pharmacy/inventory" },
]

export default function PharmacyNav() {
  return <div>pharmacy-nav</div>;
}
