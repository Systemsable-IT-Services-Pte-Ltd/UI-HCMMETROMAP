import React, { ReactNode } from "react";

interface FooterColumnProps {
  title: string;
  children: ReactNode;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, children }) => {
  return (
    <div className="space-y-4">
      <div className="text-lg font-bold text-pink-300">{title}</div>
      {children}
    </div>
  );
};

export default FooterColumn;
