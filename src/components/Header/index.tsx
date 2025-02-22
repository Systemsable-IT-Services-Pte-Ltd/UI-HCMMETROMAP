import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderContent from "./HeaderContent";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="container-header">
      <div
        className="text-xl md:text-2xl font-bold cursor-pointer tracking-widest"
        onClick={() => handleNavigation("/")}
      >
        HCMC Metro Map
      </div>
      <div className="flex gap-4">
        <HeaderContent onClick={handleNavigation} />
      </div>
    </header>
  );
};

export default Header;
