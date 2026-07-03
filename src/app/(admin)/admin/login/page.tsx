import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-6">
          <p className="text-on-tertiary-container">Loading...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
