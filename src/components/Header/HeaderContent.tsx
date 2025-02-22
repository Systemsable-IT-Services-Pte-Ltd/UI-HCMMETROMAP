import React from "react";

interface IHeaderContent {
  onClick: (path: string) => void;
}
const HeaderContent: React.FC<IHeaderContent> = (props) => {
  const { onClick } = props;
  const navItems = [
    { content: "Home", path: "/" },
    { content: "About", path: "/about" },
    { content: "Contact", path: "/contact" },
  ];
  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          onClick={() => onClick && onClick(item?.path)}
          className="hover:underline text-lg md:text-xl cursor-pointer hover:text-pink-500"
        >
          {item?.content}
        </div>
      ))}
    </>
  );
};

export default HeaderContent;
