import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

const ErrorLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 max-w-lg w-full text-center border-t-4 border-red-600 animate-fade-in">
        <div className="bg-red-100 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
          <FaExclamationTriangle className="text-red-600 text-4xl" />
        </div>

        <div className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">
          Oops!
        </div>
        <div className="text-xl md:text-2xl font-semibold text-red-600 mb-4">
          Page Not Found
        </div>

        <div className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </div>

        <div className="h-0.5 w-16 bg-gray-200 mx-auto mb-8"></div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors duration-300 cursor-pointer"
          >
            <BiArrowBack /> Go Back
          </div>

          <div
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 cursor-pointer"
          >
            <FaHome /> Go Home
          </div>
        </div>
      </div>
    </div>
  );
};
export default ErrorLayout;
