import React, { FC } from "react";
import Button from "@/src/shared/ui/Button";

interface ChartHeaderProps {
  setDetailType: React.Dispatch<React.SetStateAction<"i" | "s">>;
}

const ChartHeader: FC<ChartHeaderProps> = ({ setDetailType }) => {
  const handleButton = (type: "i" | "s") => {
    setDetailType(type);
  };

  return (
    <div className="flex flex-row items-center justify-center w-full gap-4">
      <Button text={"수입"} color={"green"} onClick={() => handleButton("i")} />
      <Button text={"지출"} color={"blue"} onClick={() => handleButton("s")} />
    </div>
  );
};

export default ChartHeader;
