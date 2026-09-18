import FirstLoginPasswordChangeForm from "@/features/auth/components/first-login-password-change-form";
import React from "react";

export default function FirstLoginPasswordChangePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-muted/20">
      <FirstLoginPasswordChangeForm />
    </div>
  );
}
