import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthPage = request.nextUrl.pathname === "/";

  // 로그인 페이지에 이미 로그인한 사용자가 접근하면 대시보드로 리디렉션
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 인증되지 않은 사용자가 보호된 페이지에 접근하면 로그인 페이지로 리디렉션
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/finance/:path*",
    "/calendar/:path*",
    "/tasks/:path*",
    "/settings/:path*",
  ],
};
