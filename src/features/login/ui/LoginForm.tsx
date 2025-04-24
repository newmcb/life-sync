"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const LoginFormFeature = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await signIn("google", {
        redirect: true,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Life Sync</h2>
        <p className="mt-2 text-sm text-gray-600">
          효율적인 일상 관리를 시작하세요
        </p>
      </div>

      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
          Google로 계속하기
        </button>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Google 계정으로 간편하게 시작하세요
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormFeature;
