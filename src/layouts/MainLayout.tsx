import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";
import Header from "@components/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col max-w-full min-h-screen relative">
      <div className="mt-[55px] md:mt-[65px]">
        <Header />
      </div>
      <div className="flex-1 min-h-screen max-w-full bg-gray-50">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
