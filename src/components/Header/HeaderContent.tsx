import React from "react";
import LanguageToggle from "../LanguageToggle";
import { useTranslation } from "@hooks/useTranslation";

interface IHeaderContent {
  onClick: (path: string) => void;
}

const HeaderContent: React.FC<IHeaderContent> = (props) => {
  const { onClick } = props;
  const { t } = useTranslation();

  const navItems = [
    { content: t("lines"), path: "/lines" },
    { content: t("about"), path: "/about" },
    { content: t("contact"), path: "/contact" },
  ];

  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          onClick={() => onClick && onClick(item?.path)}
          className="md:hover:underline text-base md:text-xl cursor-pointer hover:text-pink-300 transition-colors duration-200"
        >
          {item?.content}
        </div>
      ))}
      <LanguageToggle />
    </>
  );
};

export default HeaderContent;
