import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * `session.user` 에 id를 추가합니다.
   */
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }

  /**
   * `authorize()` 나 구글 프로바이더가 채워주는 `user` 에 id 필드를 추가합니다.
   */
  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT 토큰에도 id를 저장할 수 있게 확장합니다.
   */
  interface JWT extends DefaultJWT {
    id: string;
  }
}
