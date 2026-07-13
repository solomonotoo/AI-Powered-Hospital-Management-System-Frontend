import * as React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/features/layout/theme-toggle";
import { ReusablePhoto } from "../web/reusable-phtoto";
import Link from "next/link";
import { buttonVariants } from "../../components/ui/button";

interface AppNavbarProps {
  /** Optional section title shown next to the sidebar trigger, e.g. "Patients" */
  title?: string;
}

export function AppNavbar({ title }: AppNavbarProps) {
  return (
    <nav className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
        {title && (
          <span className="text-sm font-medium text-foreground">{title}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "outline" })}
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className={buttonVariants({ variant: "ghost" })}
        >
          Signup
        </Link>
        <ThemeToggle />
        <ReusablePhoto src="/images/solo.jpg" />
      </div>
    </nav>
  );
}
