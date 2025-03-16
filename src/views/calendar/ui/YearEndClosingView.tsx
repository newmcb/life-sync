import React from "react";
import { GraphFeature } from "@/src/features/graph";

import YearEndClosingInfo from "@/src/features/yearEndClosing/ui/YearEndClosingInfo";
import CategoryPaymentList from "@/src/features/yearEndClosing/ui/CategoryPaymentList";

const YearEndClosingView = () => {
  return (
    <div className="flex flex-wrap h-[calc(100vh-4rem)]] w-full mx-auto overflow-hidden">
      <div className={"w-1/2 h-full p-6 flex flex-col"}>
        <div className={"w-full h-2/5 p-6 flex overflow-hidden"}>
          <YearEndClosingInfo />
        </div>
        <div className={"w-full h-3/5 p-6 flex overflow-hidden"}>
          <GraphFeature />
        </div>
      </div>

      <div className={"w-1/2 h-full p-6 flex overflow-hidden shadow-md"}>
        <CategoryPaymentList />
      </div>
    </div>
  );
};

export default YearEndClosingView;
