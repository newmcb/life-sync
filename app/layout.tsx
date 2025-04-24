"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// 로딩 컴포넌트
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    </div>
  );
}

// 인증 상태를 확인하는 컴포넌트
function AuthCheck({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 세션 상태가 변경되면 로딩 상태 업데이트
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <html lang="ko">
      <body className={inter.className}>
        <SessionProvider>
          <AuthCheck>
            <div className="flex min-h-screen bg-gray-50">
              {!isLoginPage && <Sidebar />}
              <main
                className={`flex-1 ${!isLoginPage ? "md:ml-64" : ""} pt-16 md:pt-0`}
              >
                {children}
              </main>
            </div>
          </AuthCheck>
        </SessionProvider>
      </body>
    </html>
  );
}
