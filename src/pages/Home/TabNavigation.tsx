import React from "react";
import { FaMapMarkedAlt, FaTrain } from "react-icons/fa";
import { MdSchedule, MdUpdate } from "react-icons/md";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: "map", label: "Metro Map", icon: <FaMapMarkedAlt /> },
    { id: "lines", label: "Lines & Stations", icon: <FaTrain /> },
    { id: "schedule", label: "Schedules", icon: <MdSchedule /> },
    { id: "updates", label: "Updates", icon: <MdUpdate /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors border-b-2 -mb-[2px] ${
            activeTab === tab.id
              ? "border-b-purple-600 text-purple-600"
              : "border-b-transparent text-gray-600 hover:text-purple-600"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;