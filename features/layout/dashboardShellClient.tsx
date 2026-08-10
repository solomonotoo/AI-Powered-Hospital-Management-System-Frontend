"use client";

import { AppSidebar } from "@/features/layout/app-sidebar";
import { AppNavbar } from "@/features/layout/app-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

//client component for dynamic height and route protection
export function DashboardShellClient({
  children,
  title,
  defaultOpen,
}: {
  children: React.ReactNode;
  title?: string;
  defaultOpen: boolean;
}) {
  const [height, setHeight] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    //update height on resize and orientation change
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    //listen to both resize and orientation change events
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", () => {
      //small delay to allow browser to finish orientation change
      setTimeout(updateHeight, 100);
    });

    //initial update
    updateHeight();

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="text-sm font-medium animate-pulse text-muted-foreground">
          Verifying session...
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={{
          height: height > 0 ? `${height}px` : "100vh",
          maxHeight: height > 0 ? `${height}px` : "100vh",
          overflow: "hidden",
          width: "100%",
          maxWidth: "100vw",
        }}
        className="overflow-hidden"
      >
        <AppSidebar />
        <SidebarInset
          className="flex flex-col overflow-hidden"
          style={{
            height: height > 0 ? `${height}px` : "100vh",
            maxHeight: height > 0 ? `${height}px` : "100vh",
          }}
        >
          <AppNavbar title={title} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-blue-100/20 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
