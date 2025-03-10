import React from "react";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const FooterContact: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <MdLocationOn className="text-pink-400 mr-2" />
        <span className="text-gray-200">Ho Chi Minh City, Vietnam</span>
      </div>
      <div className="flex items-center">
        <MdPhone className="text-pink-400 mr-2" />
        <span className="text-gray-200">+84 317 789 859</span>
      </div>
      <div className="flex items-center">
        <MdEmail className="text-pink-400 mr-2" />
        <span className="text-gray-200">technoasia@hcmcmetromap.com</span>
      </div>
    </div>
  );
};

export default FooterContact;