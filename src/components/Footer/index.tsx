import React from "react";
import FooterColumn from "./FooterColumn";
import FooterNavigation from "./FooterNavigation";
import FooterContact from "./FooterContact";
import FooterNewsletter from "./FooterNewsletter";
import FooterSocial from "./FooterSocial";
import FooterCopyright from "./FooterCopyright";

const Footer: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 text-white">
      <div className="px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold tracking-wider">
              HCMC Metro Map
            </div>
            <div className="text-gray-200 text-sm">
              Explore Ho Chi Minh City's evolving metro system with our
              interactive map. Plan your journey and stay updated with the
              latest developments.
            </div>
          </div>
          <FooterColumn title="Navigation">
            <FooterNavigation />
          </FooterColumn>

          <FooterColumn title="Contact">
            <FooterContact />
          </FooterColumn>

          <FooterColumn title="Stay Updated">
            <FooterNewsletter />
          </FooterColumn>
        </div>

        <FooterSocial />
        <FooterCopyright />
      </div>
    </div>
  );
};

export default Footer;
