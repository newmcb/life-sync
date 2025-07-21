"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";
import LoadingScreen from "@/src/shared/ui/LoadingScreen";
import { LayoutSidebar } from "@/src/widgets/layoutSidebar";

function AuthCheck({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") setIsLoading(false);
  }, [status]);

  if (isLoading) return <LoadingScreen />;
  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <SessionProvider>
      <AuthCheck>
        <div className="flex min-h-screen bg-gray-50">
          {!isLoginPage && <LayoutSidebar />}
          <main
            className={`flex-1 ${!isLoginPage ? "md:ml-64" : ""} pt-16 md:pt-0`}
          >
            {children}
          </main>
        </div>
        <Analytics />
      </AuthCheck>
    </SessionProvider>
  );
}
