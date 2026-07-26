"use client";

import React from "react";

interface SharedLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  pageNavbar?: React.ReactNode;
}
export function SharedLayout({
  children,
  title,
  description,
  pageNavbar,
}: SharedLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {pageNavbar}
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
