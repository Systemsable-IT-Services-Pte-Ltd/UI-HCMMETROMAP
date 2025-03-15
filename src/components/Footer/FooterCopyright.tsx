import React from "react";
import { useNavigate } from "react-router-dom";

const FooterCopyright: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-12 pt-6 border-t border-purple-700 text-center">
      <div className="text-gray-300">
        &copy; {currentYear} HCMC Metro Map. All rights reserved.
      </div>
      <div className="mt-2 text-sm flex justify-center items-center gap-3">
        <div
          onClick={() => navigate("/privacy-policy")}
          className="text-pink-300 hover:text-pink-400 hover:underline cursor-pointer"
        >
          Privacy Policy
        </div>
        <span className="text-purple-500">•</span>
        <div
          onClick={() => navigate("/terms-of-service")}
          className="text-pink-300 hover:text-pink-400 hover:underline cursor-pointer"
        >
          Terms of Service
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;
