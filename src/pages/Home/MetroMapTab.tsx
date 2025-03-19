import TranslatedText from "@components/TranslatedText";
import type { MetroStation } from "@data/metroLines";
import { metroLines, metroStations, plannedLines } from "@data/metroLines";
import { useTranslation } from "@hooks/useTranslation";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MapLegend from "@pages/Home/Map/MapLegend";
import MetroLineInfo from "@pages/Home/Map/MetroLineInfo";

interface MetroMapTabProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
  initialSelectedStation?: MetroStation | null;
}

const MetroMapTab: React.FC<MetroMapTabProps> = ({
  mapRef,
  // initialSelectedStation = null,
}) => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showPlannedLines, setShowPlannedLines] = useState(false);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const togglePlannedLines = () => {
    setShowPlannedLines(!showPlannedLines);
  };

  // Navigate to station detail page when a station is clicked
  const handleStationClick = (station: MetroStation) => {
    navigate(`/station/${station?.slug}`);
  };

  // Combine operational and planned lines based on user selection
  const displayLines = {
    ...metroLines,
    ...(showPlannedLines ? plannedLines : {}),
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8" ref={mapRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{t("metroMap")}</h2>
        <div className="flex gap-2">
          <button
            onClick={togglePlannedLines}
            className={`px-3 py-1 rounded-md ${
              showPlannedLines
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <TranslatedText textKey="plannedLines" />
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

      <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-[700px]">
        {/* Map Legend */}
        <MapLegend displayLines={displayLines} />

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
                  title={station.name[language as keyof typeof station.name]}
                />
              );
            })}
        </div>
      </div>

      {/* Metro Line Info from WordPress */}
      <MetroLineInfo />

      <div className="mt-4">
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <FaInfoCircle className="text-blue-500" />
          {t("clickStationInfo")}
        </p>
      </div>
    </div>
  );
};

export default MetroMapTab;
