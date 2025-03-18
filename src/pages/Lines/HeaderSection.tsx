import React from "react";
import hcmcBackground from "@assets/images/background/hcmcmetro-background.jpg";

const HeaderSection: React.FC = () => {
  return (
    <div
      className="relative w-full min-h-[500px] flex items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${hcmcBackground})`,
      }}
    >
      {/* Overlay mờ tím/pink */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />

      {/* Nội dung */}
      <div className="relative container mx-auto px-4 text-center z-10 flex flex-col justify-center items-center h-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          HCMC Metro Map
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-white">
          Explore Ho Chi Minh City's metro network. View all planned lines and stations to help plan your journey across the city.
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;