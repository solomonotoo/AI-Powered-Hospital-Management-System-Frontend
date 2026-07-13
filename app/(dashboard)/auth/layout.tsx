import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50/20 px-4 py-8 ">
      {children}
    </div>
  );
}
