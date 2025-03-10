import React from "react";
import { FaMapMarkedAlt, FaRoute } from "react-icons/fa";
import hcmcBackground from "@assets/images/background/hcmcmetro-background.jpg";
interface HeaderSectionProps {
  setActiveTab?: (tab: string) => void;
  handleNavigate?: (path: string) => void;
  scrollToMap?: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  setActiveTab,
  handleNavigate,
  scrollToMap,
}) => (
  <div className="relative h-[60vh] w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${hcmcBackground})`,
        filter: "brightness(0.7)",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
    <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 z-10">
      <div className="text-4xl md:text-6xl font-bold mb-4">HCMC Metro Map</div>
      <div className="text-lg md:text-xl max-w-2xl mb-8">
        Explore Ho Chi Minh City's modern metro system with our interactive map
        and real-time information.
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={scrollToMap}
          className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <FaMapMarkedAlt /> View Metro Map
        </button>
        <button
          onClick={() => handleNavigate?.("/plan-journey")}
          className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-8 rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <FaRoute /> Plan Journey
        </button>
      </div>
    </div>
  </div>
);

export default HeaderSection;
