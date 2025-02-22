import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <footer className="bg-purple-900 text-white py-4 min-h-[100px] flex justify-center items-center">
      <div className="container mx-auto text-center">
        <div className="text-base">
          &copy; {new Date().getFullYear()} HCMC Metro Map. All rights reserved.
        </div>
        <div className="text-sm flex justify-center items-center gap-2">
          <div
            onClick={() => handleNavigate("/privacy-policy")}
            className="text-pink-500 hover:underline"
          >
            Privacy Policy
          </div>
          {" | "}
          <div
            onClick={() => handleNavigate("/terms-of-service")}
            className="text-pink-500 hover:underline"
          >
            Terms of Service
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
