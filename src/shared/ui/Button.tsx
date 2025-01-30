import { FC } from "react";

interface ButtonProps {
  text: string;
  color: "green" | "blue" | "red" | "gray"; // 사용할 색상 옵션
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, color, onClick }) => {
  // 색상에 따른 Tailwind 클래스 설정
  const colorClasses: Record<string, string> = {
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400",
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
    gray: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400",
  };

  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md text-white focus:ring-2 focus:outline-none ${colorClasses[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
