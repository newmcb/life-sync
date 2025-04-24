import React, { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { MENU_ITEM } from "@/src/widgets/layoutSidebar/model/sidebar";

interface LayoutSidebarProps {
  selectHeader?: string;
}

const LayoutSidebar: FC<LayoutSidebarProps> = ({ selectHeader }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // 화면 크기가 변경될 때 사이드바 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // 초기 로드 시 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      {/* 모바일 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {isOpen ? (
          <FaTimes className="h-6 w-6 text-gray-600" />
        ) : (
          <FaBars className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* 사이드바 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 bg-indigo-600">
            <h1 className="text-xl font-bold text-white">Life Sync</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 text-white hover:bg-indigo-700 rounded-md"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {MENU_ITEM.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    // 모바일에서 메뉴 클릭 시 사이드바 닫기
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 사용자 정보 및 로그아웃 버튼 */}
          <div className="p-4 border-t border-gray-200">
            {status === "loading" ? (
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="ml-3 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {session?.user?.name || session?.user?.email || "사용자"}
                  </p>
                  <p className="text-xs text-gray-500 overflow-hidden">
                    {session?.user?.email || ""}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutSidebar;
