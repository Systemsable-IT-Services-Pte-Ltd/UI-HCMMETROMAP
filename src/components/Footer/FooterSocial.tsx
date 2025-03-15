import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterSocial: React.FC = () => {
  return (
    <div className="mt-12 flex justify-center space-x-6">
      {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
        <div
          key={index}
          className="bg-purple-800 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <Icon className="text-white text-xl" />
        </div>
      ))}
    </div>
  );
};

export default FooterSocial;
