import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import ClientProviders from "@/src/app/ClientProviders";

export const metadata: Metadata = {
  title: "Life Sync",
  description: '"Life Sync로 할 일·일정·재무를 한 곳에서 관리하세요!',
  openGraph: {
    title: "Life Sync – 일상 관리를 혁신하다",
    description:
      "Life Sync로 업무·일정·재무를 한눈에, 효율적으로 관리해 보세요!",
    url: "https://life-sync-khaki.vercel.app/dashboard",
    type: "website",
    images: [
      {
        url: "https://placehold.co/1200x630/ffffff/000000?text=Life+Sync",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
