import React from "react";

const FooterNewsletter: React.FC = () => {
  return (
    <>
      <div className="text-gray-200 text-sm">
        Subscribe to our newsletter for the latest updates on HCMC Metro.
      </div>
      <div className="flex">
        <input
          type="email"
          placeholder="Your email"
          className="bg-purple-950 border border-purple-700 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-pink-400"
        />
        <div className="bg-pink-500 hover:bg-pink-600 transition-colors duration-300 rounded-r-md px-4 text-sm flex items-center justify-center cursor-pointer">
          Subscribe
        </div>
      </div>
    </>
  );
};

export default FooterNewsletter;
