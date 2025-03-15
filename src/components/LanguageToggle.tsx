import React from "react";
import { useTranslation } from "@hooks/useTranslation";
import { FaFlagUsa } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors duration-200 flex items-center gap-2"
    >
      {language === "en" ? (
        <>
          <FaFlag className="text-sm text-red-600" />
          <span>Tiếng Việt</span>
        </>
      ) : (
        <>
          <FaFlagUsa className="text-sm text-blue-700" />
          <span>English</span>
        </>
      )}
    </button>
  );
};

export default LanguageToggle;
