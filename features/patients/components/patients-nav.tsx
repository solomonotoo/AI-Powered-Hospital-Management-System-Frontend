"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { SectionTab, SectionTabs } from "@/features/layout/section-tabs";

const PATIENT_TABS: SectionTab[] = [
  { label: "All patients", href: "/patients" },
  { label: "Register", href: "/patients/register" },
  { label: "Medical Records", href: "/patients/admissions" },
];

/**
 * Tab bar shared by every /patients/* page. Lives in the layout (not in
 * individual pages) because it doesn't change per-page — only the active
 * state does, which this component derives itself from the current path.
 */
export function PatientsNav() {
  return <SectionTabs tabs={PATIENT_TABS} />;
}
