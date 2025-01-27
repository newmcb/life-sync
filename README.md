## Study 용 프로젝트

스터디 내용
```
- FSD 구조

app/                        # Next.js 라우팅 및 페이지 설정 디렉토리 (App Router 사용)
├── [page]/                 # 동적 페이지 라우팅 디렉토리 (예: calendar, memo 등)
│   ├── page.tsx            # 특정 페이지의 루트 컴포넌트 파일 (Next.js 라우팅 엔트리)
│   └── layout.tsx          # 해당 페이지의 레이아웃 설정 파일 (선택적 사용)
├── font/                   # 폰트 설정 또는 폰트 파일 저장소
├── page.tsx                # 애플리케이션 루트 페이지 컴포넌트 (Next.js 기본 진입점)
├── layout.tsx              # 애플리케이션 전체 공통 레이아웃 컴포넌트
├── global.css              # 전역 스타일 파일
src/
├── app/                    # 애플리케이션 전역 설정 디렉토리
│   ├── index.tsx           # 애플리케이션 초기화 및 엔트리포인트 파일
│   └── ReactQueryProvider.tsx  # React Query를 위한 전역 프로바이더 설정 파일
│
├── features/               # 특정 기능(Feature) 관련 모듈 디렉토리
│   └── [features]/         # 동적 기능 모듈 디렉토리 (예: calendar, memo 등)
│       ├── ui/             # 특정 기능의 UI 컴포넌트
│       ├── model/          # 특정 기능의 상태 관리 및 비즈니스 로직
│       ├── api/            # 특정 기능의 API 호출 로직
│       └── index.ts        # 특정 기능의 진입점 모듈
│
├── shared/                 # 애플리케이션 전역에서 재사용 가능한 공통 모듈 디렉토리
│   ├── ui/                 # 공통 UI 컴포넌트 (예: Button, Modal 등)
│   ├── lib/                # 유틸리티 함수 및 헬퍼 함수 (예: 날짜 형식화 함수)
│   ├── api/                # 공통 API 설정 및 헬퍼 함수
│   └── model/              # 공통 상태 관리 및 비즈니스 로직
│
├── entities/               # 도메인 데이터와 로직을 처리하는 디렉토리
│   └── [entity]/           # 도메인별 데이터 및 로직 디렉토리 (예: user, product 등)
│       ├── ui/             # 도메인별 UI 컴포넌트
│       ├── model/          # 도메인별 상태 관리 및 비즈니스 로직
│       ├── api/            # 도메인별 API 호출 로직
│       └── index.ts        # 도메인별 진입점 모듈
│
├── views/                  # 페이지에서 사용하는 공통 View 디렉토리
│   └── [views]/            # 동적 View 모듈 디렉토리 (예: calendar, memo 등)
│       ├── ui/             # View 관련 UI 컴포넌트
│       ├── model/          # View 상태 관리 및 비즈니스 로직
│       ├── api/            # View 관련 API 호출 로직
│       └── index.ts        # View 모듈 진입점
│
└── widgets/                # 재사용 가능한 위젯 모듈 디렉토리 (작고 독립적인 컴포넌트)



    


- react-query
- zustand
- tailwindcss
```




First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
