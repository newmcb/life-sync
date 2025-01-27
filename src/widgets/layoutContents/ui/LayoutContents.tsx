import React from "react";

const LayoutContents = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-screen pt-20">{children}</main>;
};

export default LayoutContents;
