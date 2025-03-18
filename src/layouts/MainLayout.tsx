import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";
import Header from "@components/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col max-w-full min-h-screen relative">
      <Header />
      <main className="flex-grow w-full mt-[55px] md:mt-[65px] bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
