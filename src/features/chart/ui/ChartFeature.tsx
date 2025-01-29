import React, { FC } from "react";
import { BarChart } from "@/src/entities/chart";

interface ChartFeatureProps {
  chartType?: string;
}

const ChartFeature: FC<ChartFeatureProps> = ({ chartType = "bar" }) => {
  console.log("123");
  return <div>{chartType === "bar" && <BarChart chartType={"s"} />}</div>;
};

export default ChartFeature;
