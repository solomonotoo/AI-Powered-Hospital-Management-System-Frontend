import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type SectionTab = {
  label: string;
  href: string;
  exact?: boolean;
};

interface SectionTabsProps {
  tabs: SectionTab[];
}

/**
 * Generic tab bar for section layouts (patients, pharmacy, OPD, IPD, etc).
 * Each section supplies its own tab config; this component only handles
 * rendering + active-state derivation from the current pathname.
 */

export function SectionTabs({ tabs }: SectionTabsProps) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto ">
      {tabs.map((tab) => {
        const isActive = tab.exact
          ? pathname === tab.href
          : pathname?.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
