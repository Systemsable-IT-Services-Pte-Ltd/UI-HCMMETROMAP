import React, { useState, forwardRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { metroStations, metroLines, plannedLines } from "../../data/metroLines";
import type { MetroStation } from "../../data/metroLines";

interface MetroMapTabProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
}

const MetroMapTab = forwardRef(({ mapRef }: MetroMapTabProps) => {
  const [selectedStation, setSelectedStation] = useState<MetroStation | null>(
    null
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showPlannedLines, setShowPlannedLines] = useState(false);
  const [language, setLanguage] = useState<"en" | "vi">("en");

  const handleStationClick = (station: MetroStation) => {
    setSelectedStation(station);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const togglePlannedLines = () => {
    setShowPlannedLines(!showPlannedLines);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en");
  };

  // Combine operational and planned lines based on user selection
  const displayLines = {
    ...metroLines,
    ...(showPlannedLines ? plannedLines : {}),
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8" ref={mapRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === "en" ? "Metro Map" : "Bản đồ Metro"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
          >
            {language === "en" ? "Tiếng Việt" : "English"}
          </button>
          <button
            onClick={togglePlannedLines}
            className={`px-3 py-1 rounded-md ${
              showPlannedLines
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {language === "en" ? "Planned Lines" : "Tuyến Quy Hoạch"}
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            aria-label="Zoom out"
          >
            -
          </button>
        </div>
      </div>

      <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-[500px]">
        {/* Map Legend */}
        <div className="absolute top-4 right-4 bg-white p-3 rounded-md shadow-md z-10 max-h-[400px] overflow-y-auto">
          <h3 className="font-bold text-sm mb-2">
            {language === "en" ? "Metro Lines" : "Các Tuyến Metro"}
          </h3>
          {Object.values(displayLines).map((line) => (
            <div key={line.id} className="flex items-center gap-2 mb-1">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: line.color }}
              ></div>
              <span className="text-sm">
                {line.shortName[language]} - {line.name[language]}
                {line.status !== "operational" && (
                  <span className="text-xs ml-1 text-gray-500">
                    {language === "en"
                      ? line.status === "under-construction"
                        ? "(Under Construction)"
                        : "(Planned)"
                      : line.status === "under-construction"
                      ? "(Đang Xây Dựng)"
                      : "(Quy Hoạch)"}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Map Content */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Draw Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {Object.values(displayLines).map((line) => {
              // Skip lines with no stations
              if (line.stations.length === 0) return null;

              const lineStations = line.stations.map(
                (stationId) => metroStations[stationId]
              );

              // Create path for the line
              let pathData = "";
              lineStations.forEach((station, index) => {
                if (index === 0) {
                  pathData += `M${station.coordinates.x},${station.coordinates.y} `;
                } else {
                  pathData += `L${station.coordinates.x},${station.coordinates.y} `;
                }
              });

              return (
                <path
                  key={line.id}
                  d={pathData}
                  stroke={line.color}
                  strokeWidth="6"
                  strokeDasharray={
                    line.status !== "operational" ? "5,5" : "none"
                  }
                  fill="none"
                />
              );
            })}
          </svg>

          {/* Draw Stations */}
          {Object.values(metroStations)
            .filter((station) => {
              // Only show stations that are on displayed lines
              return Object.values(displayLines).some((line) =>
                line.stations.includes(station.id)
              );
            })
            .map((station) => {
              // Find which line this station belongs to
              const stationLines = Object.values(displayLines).filter((line) =>
                line.stations.includes(station.id)
              );

              // Use the color of the first line for the station
              const lineColor =
                stationLines.length > 0 ? stationLines[0].color : "#000";

              // Determine if this is an interchange station
              const isInterchange =
                stationLines.length > 1 || station.isInterchange;

              return (
                <div
                  key={station.id}
                  className={`absolute w-4 h-4 bg-white border-2 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform ${
                    isInterchange
                      ? "w-5 h-5 -translate-x-2.5 -translate-y-2.5"
                      : ""
                  } ${station.isTerminal ? "border-4" : "border-2"}`}
                  style={{
                    borderColor: lineColor,
                    left: station.coordinates.x,
                    top: station.coordinates.y,
                  }}
                  onClick={() => handleStationClick(station)}
                  title={station.name[language]}
                ></div>
              );
            })}
        </div>

        {/* Station Info Popup */}
        {selectedStation && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-md shadow-lg z-20 max-w-xs">
            <div className="flex justify-between items-start">
              <h3 className="font-bold">{selectedStation.name[language]}</h3>
              <button
                onClick={() => setSelectedStation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="mt-2">
              {/* Lines serving this station */}
              {Object.values(displayLines)
                .filter((line) => line.stations.includes(selectedStation.id))
                .map((line) => (
                  <div key={line.id} className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: line.color }}
                    ></div>
                    <span className="text-sm">
                      {line.shortName[language]} - {line.name[language]}
                    </span>
                  </div>
                ))}

              {/* Station features */}
              <div className="text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <FaInfoCircle className="text-blue-500" />
                  <span>
                    {language === "en" ? "Station facilities: " : "Tiện ích: "}
                    {selectedStation.features
                      .map((feature) => {
                        const featureLabels: Record<
                          string,
                          { en: string; vi: string }
                        > = {
                          elevator: { en: "Elevator", vi: "Thang máy" },
                          "ticket-office": {
                            en: "Ticket Office",
                            vi: "Phòng vé",
                          },
                          restroom: { en: "Restrooms", vi: "Nhà vệ sinh" },
                          "information-desk": {
                            en: "Information Desk",
                            vi: "Quầy thông tin",
                          },
                          security: { en: "Security", vi: "An ninh" },
                          parking: { en: "Parking", vi: "Bãi đậu xe" },
                          "bus-interchange": {
                            en: "Bus Interchange",
                            vi: "Trạm xe buýt",
                          },
                        };
                        return featureLabels[feature]?.[language] || feature;
                      })
                      .join(", ")}
                  </span>
                </div>
              </div>

              {/* Nearby attractions */}
              {selectedStation.nearbyAttractions &&
                selectedStation.nearbyAttractions.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    <div className="font-medium">
                      {language === "en" ? "Nearby: " : "Lân cận: "}
                    </div>
                    <ul className="list-disc list-inside">
                      {selectedStation.nearbyAttractions.map(
                        (attraction, index) => (
                          <li key={index} className="text-xs">
                            {attraction}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <FaInfoCircle className="text-blue-500" />
          {language === "en"
            ? "Click on any station for more information"
            : "Nhấp vào trạm bất kỳ để xem thông tin chi tiết"}
        </p>
      </div>
    </div>
  );
});

export default MetroMapTab;