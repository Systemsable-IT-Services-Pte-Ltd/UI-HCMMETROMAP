import React from "react";

interface IHeaderContent {
  onClick: (path: string) => void;
}
const HeaderContent: React.FC<IHeaderContent> = (props) => {
  const { onClick } = props;
  const navItems = [
    { content: "Lines", path: "/lines" },
    { content: "About", path: "/about" },
    { content: "Contact", path: "/contact" },
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
    </>
  );
};

export default HeaderContent;
