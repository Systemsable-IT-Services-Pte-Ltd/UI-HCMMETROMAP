import React from "react";
import { useNavigate } from "react-router-dom";

const FooterNavigation: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-2">
      {["Home", "About", "Contact", "FAQ"].map((item) => (
        <div key={item} className="flex">
          <div
            className="text-gray-200 hover:text-pink-300 cursor-pointer transition-colors duration-200 flex items-center"
            onClick={() => handleNavigate(`/${item.toLowerCase()}`)}
          >
            <span className="mr-2">›</span> {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterNavigation;
