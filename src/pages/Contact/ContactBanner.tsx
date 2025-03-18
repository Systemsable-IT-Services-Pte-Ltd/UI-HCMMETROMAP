import React from "react";
import hcmcBackground from "@assets/images/background/hcmcmetro-background.jpg";

const ContactBanner: React.FC = () => {
  return (
    <div
      className="relative w-full h-[60vh] flex items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${hcmcBackground})`,
      }}
    >
      {/* Overlay mờ tím/pink */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/80 to-pink-900/80"></div>

      {/* Nội dung */}
      <div className="relative container mx-auto px-4 text-center z-10 flex flex-col justify-center items-center h-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Contact Us
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-white">
          We are always ready to support and listen to your opinions. Please
          contact us via the channels below.
        </p>
      </div>
    </div>
  );
};

export default ContactBanner;