import React, { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const BaseInput: FC<InputProps> = (props) => {
  return (
    <input
      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
      {...props}
    />
  );
};

export default BaseInput;
