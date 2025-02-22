import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col max-w-full min-h-screen bg-gray-100">
      <div className="max-w-full min-h-screen bg-amber-100">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
