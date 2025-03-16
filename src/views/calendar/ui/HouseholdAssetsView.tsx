"use client";

import React, { useState } from "react";
import HouseholdAssetsFeature from "@/src/features/assets/ui/HouseholdAssetsFeature";

const HouseholdAssetsView = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        2025년 우리집 자산 현황
      </h1>

      {/* 수정 버튼 */}
      <div className="text-right mb-2">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 text-white rounded ${
            isEditing ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {isEditing ? "저장" : "수정"}
        </button>
      </div>

      <HouseholdAssetsFeature isEditing={isEditing} />
    </div>
  );
};

export default HouseholdAssetsView;
