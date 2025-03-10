import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderContent from "./HeaderContent";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className="container-header relative z-10">
      <div
        className="text-xl md:text-2xl font-bold cursor-pointer tracking-widest"
        onClick={() => handleNavigation("/")}
      >
        HCMC Metro Map
      </div>

      {/* Desktop */}
      <div className="hidden md:flex gap-4">
        <HeaderContent onClick={handleNavigation} />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div onClick={handleToggleMenu} className="p-2 cursor-pointer">
          <RiMenu3Line className="text-2xl" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 w-64 h-full bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 shadow-lg 
          transition-transform duration-300 ease-in-out pt-16 z-50 
        `}
        style={{
          transform: menuOpen
            ? "translate3D(0, 0, 0)"
            : "translate3D(100%, 0, 0)",
        }}
      >
        <div className="absolute top-4 right-4">
          <div onClick={handleToggleMenu} className="p-2 cursor-pointer">
            <RiCloseLine className="text-2xl text-white hover:rotate-90 transition-transform duration-200 ease-in-out" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <HeaderContent onClick={handleNavigation} />
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={handleToggleMenu}
        />
      )}
    </header>
  );
};

export default Header;