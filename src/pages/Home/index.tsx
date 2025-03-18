import type { MetroStation } from "@data/metroLines";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "./FeaturesSection";
import HeaderSection from "./HeaderSection";
import LatestUpdatesSection from "./LatestUpdatesSection";
import MetroMapTab from "./MetroMapTab";
import SearchSection from "./SearchSection";
import TabNavigation from "./TabNavigation";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("map");
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedStation, setSelectedStation] = useState<MetroStation | null>(
    null
  );

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );
  const scrollToMap = useCallback(() => {
    setActiveTab("map");
    if (mapRef.current) {
      mapRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);
  const handleStationSelect = useCallback(
    (station: MetroStation) => {
      setSelectedStation(station);
      scrollToMap();
    },
    [scrollToMap]
  );

  const setActiveTabCallback = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <HeaderSection
        handleNavigate={handleNavigate}
        scrollToMap={scrollToMap}
      />

      <SearchSection onStationSelect={handleStationSelect} />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Navigation Tabs */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTabCallback}
        />

        {/* Tab Content */}
        {activeTab === "map" && (
          <MetroMapTab
            mapRef={mapRef}
            initialSelectedStation={selectedStation}
          />
        )}
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Latest Updates Section */}
      <LatestUpdatesSection handleNavigate={handleNavigate} />
    </div>
  );
};

export default Home;
