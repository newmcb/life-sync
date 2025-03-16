import React from "react";
import IncomeExpenseListChart from "@/src/entities/graph/ui/IncomeExpenseListChart";

const CategoryPaymentList = () => {
  const data1 = [
    { name: "주거", amount: 11355360 },
    { name: "식비", amount: 0 },
    { name: "생활용품", amount: 1421421 },
    { name: "꾸밈비", amount: 1123211 },
    { name: "건강", amount: 2414124 },
    { name: "자기계발", amount: 1500000 },
    { name: "자동차", amount: 1231322 },
    { name: "문화생활", amount: 1500000 },
    { name: "경조사", amount: 424125 },
    { name: "보험", amount: 215125 },
    { name: "용돈", amount: 125215 },
    { name: "기타", amount: 1500000 },
    { name: "비상금", amount: 5221512 },
  ];

  const data2 = [
    { name: "생활비카드", amount: 41355360 },
    { name: "삼성카드", amount: 21355360 },
    { name: "현대카드", amount: 31355360 },
    { name: "신한카드", amount: 11355360 },
    { name: "우리카드", amount: 0 },
    { name: "체크카드", amount: 6355360 },
    { name: "비상금", amount: 7355360 },
    { name: "현금/이체", amount: 355360 },
  ];

  return (
    <div className={"w-full"}>
      <h3>항목별 / 결제수단별</h3>
      <IncomeExpenseListChart data={data1} />
      <IncomeExpenseListChart data={data2} />
    </div>
  );
};

export default CategoryPaymentList;
