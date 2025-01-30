import React, { FC, useEffect, useState } from "react";
import { BarChart } from "@/src/entities/chart";
import { ChartHeader } from "@/src/features/chart";

interface ChartFeatureProps {
  chartType?: string;
}

const ChartFeature: FC<ChartFeatureProps> = ({ chartType = "bar" }) => {
  const [detailType, setDetailType] = useState<"i" | "s">("s");

  useEffect(() => {}, []);

  return (
    <div>
      <ChartHeader setDetailType={setDetailType} />
      {chartType === "bar" && <BarChart detailType={detailType} />}
    </div>
  );
};

export default ChartFeature;
