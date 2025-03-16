import React, { FC, useState } from "react";

const initialData = [
  { category: "부동산", name: "OO아파트", values: [] },
  { category: "부동산", name: "XX아파트", values: [] },
  {
    category: "부동산",
    name: "전세 보증금",
    values: [
      400000000, 400000000, 400000000, 400000000, 400000000, 400000000,
      400000000, 400000000, 400000000, 400000000, 400000000, 400000000,
    ],
  },
  { category: "부동산", name: "월세보증금", values: [] },
  {
    category: "부동산",
    name: "청약통장",
    values: [10000000, 10000000],
  },
  { category: "노후/연금", name: "개인연금", values: [8200000, 8400000] },
  { category: "노후/연금", name: "퇴직연금", values: [1000000, 8400000] },
  { category: "저축/투자", name: "적금", values: [8200000, 8400000] },
  { category: "저축/투자", name: "주식", values: [8200000, 8400000] },
  { category: "저축/투자", name: "청약통장", values: [10000000, 1100000] },
].map((item) => ({
  ...item,
  values: [...item.values, ...Array(12 - item.values.length).fill(0)].slice(
    0,
    12,
  ),
}));

interface HouseholdAssetsProps {
  isEditing: boolean;
}

const HouseholdAssetsFeature: FC<HouseholdAssetsProps> = ({ isEditing }) => {
  const [data, setData] = useState(initialData);

  const categoryRowspan: { [key: string]: number } = {};
  data.forEach((row) => {
    categoryRowspan[row.category] = (categoryRowspan[row.category] || 0) + 1;
  });

  const totalAssets = Array.from({ length: 12 }, (_, monthIndex) =>
    data.reduce((acc, row) => acc + (row.values[monthIndex] || 0), 0),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number,
  ) => {
    const newData = [...data];
    newData[rowIndex].values[colIndex] = Number(e.target.value) || 0;
    setData(newData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-900 text-white">
            <th className="border p-2 w-[350px]" colSpan={2}>
              자산 형태
            </th>

            {Array.from({ length: 12 }, (_, i) => (
              <th
                key={i}
                className="border p-2 w-1/12 min-w-[60px] whitespace-nowrap"
              >
                {i + 1}월
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => {
            const isFirstItem =
              rowIndex === 0 || data[rowIndex - 1].category !== row.category;
            const isCategoryChanged =
              rowIndex > 0 && data[rowIndex - 1].category !== row.category;

            return (
              <tr
                key={rowIndex}
                className={
                  isCategoryChanged ? "border-t-2 border-gray-500" : ""
                }
              >
                {isFirstItem && (
                  <td
                    className="border p-2 text-center font-bold bg-gray-300"
                    rowSpan={categoryRowspan[row.category]}
                  >
                    {row.category}
                  </td>
                )}
                <td className="border p-2">{row.name}</td>
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="border p-2 text-center w-1/12 min-w-[80px]"
                  >
                    {isEditing ? (
                      <input
                        type="number"
                        className="w-full p-1 text-center border rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                        value={value}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, colIndex)
                        }
                      />
                    ) : (
                      value.toLocaleString()
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="bg-indigo-900 text-white font-bold">
            <td className="border p-2 text-center" colSpan={2}>
              총 자산
            </td>
            {totalAssets.map((total, colIndex) => (
              <td key={colIndex} className="border p-2 text-center">
                {total.toLocaleString()}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default HouseholdAssetsFeature;
