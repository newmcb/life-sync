import React from "react";
import { LoginFormFeature } from "@/src/features/login";

const LoginFormView = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginFormFeature />
    </main>
  );
};

export default LoginFormView;
