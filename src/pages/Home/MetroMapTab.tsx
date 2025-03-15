import TranslatedText from "@components/TranslatedText";
import type { MetroStation } from "@data/metroLines";
import { metroLines, metroStations, plannedLines } from "@data/metroLines";
import { useTranslation } from "@hooks/useTranslation";
import type { WPPage } from "@services/api/WordPressService";
import WordPressService from "@services/api/WordPressService";
import React, { useCallback, useEffect, useState } from "react";
import { FaExternalLinkAlt, FaInfoCircle, FaTimes } from "react-icons/fa";
import { useWindowSize } from "@hooks/useWindowSize";

interface MetroMapTabProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
  initialSelectedStation?: MetroStation | null;
}

const MetroMapTab: React.FC<MetroMapTabProps> = ({
  mapRef,
  initialSelectedStation = null,
}) => {
  const { t, language } = useTranslation();
  const { isMobile } = useWindowSize();
  const [selectedStation, setSelectedStation] = useState<MetroStation | null>(
    initialSelectedStation
  );
  const [stationDetails, setStationDetails] = useState<WPPage | null>(null);
  const [stationLoading, setStationLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showPlannedLines, setShowPlannedLines] = useState(false);
  const [metroLineInfo, setMetroLineInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  // Update selected station when initialSelectedStation changes
  useEffect(() => {
    if (initialSelectedStation) {
      setSelectedStation(initialSelectedStation);
      fetchStationDetails(initialSelectedStation?.slug);
    }
  }, [initialSelectedStation]);

  const handleStationClick = async (station: MetroStation) => {
    setSelectedStation(station);
    await fetchStationDetails(station?.slug);
  };

  const fetchStationDetails = async (slug: string) => {
    setStationLoading(true);
    try {
      const stationData = await WordPressService.getPage(slug);
      setStationDetails(stationData);
    } catch (err) {
      console.error(`Error fetching station details for ${slug}:`, err);
      setStationDetails(null);
    } finally {
      setStationLoading(false);
    }
  };

  const closeStationDetails = () => {
    setSelectedStation(null);
    setStationDetails(null);
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

  const fetchMetroLineInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const line1Data = await WordPressService.getMetroLine("line-1");
      if (line1Data && line1Data.content && line1Data.content.rendered) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = line1Data.content.rendered;
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        setMetroLineInfo(textContent.substring(0, 300) + "...");
        setRetryCount(0); // Reset retry count on success
      } else {
        setMetroLineInfo(
          "Information about Line 1 (Ben Thanh - Suoi Tien) will be available soon."
        );
      }
    } catch (err) {
      console.error("Error fetching metro line info:", err);
      // Retry logic
      if (retryCount < MAX_RETRIES) {
        setRetryCount((prev) => prev + 1);
        setTimeout(() => fetchMetroLineInfo(), 1000 * (retryCount + 1));
      } else {
        setError("Could not load metro line information.");
        setMetroLineInfo(null);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount, MAX_RETRIES]);

  useEffect(() => {
    fetchMetroLineInfo();
  }, [fetchMetroLineInfo]);

  // Handle retry button click
  const handleRetry = () => {
    setRetryCount(0);
    fetchMetroLineInfo();
  };

  // Combine operational and planned lines based on user selection
  const displayLines = {
    ...metroLines,
    ...(showPlannedLines ? plannedLines : {}),
  };

  // Extract iframe from station details if available and adjust its size
  const getStationMapIframe = () => {
    if (!stationDetails?.content?.rendered) return null;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = stationDetails?.content?.rendered;

    const iframe = tempDiv.querySelector("iframe");

    if (iframe) {
      iframe.setAttribute("loading", "async");
      iframe.setAttribute("width", isMobile ? "90%" : "85%");
      iframe.setAttribute("height", isMobile ? "350" : "500");
      iframe.style.border = "0";
      return iframe.outerHTML;
    }
    return null;
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
        <div className="absolute top-4 right-4 bg-white p-3 rounded-md shadow-md z-10 max-h-[400px] overflow-y-auto">
          <h3 className="font-bold text-sm mb-2">{t("metroLines")}</h3>
          {Object.values(displayLines).map((line) => (
            <div key={line.id} className="flex items-center gap-2 mb-1">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: line.color }}
              />
              <span className="text-sm">
                {line.shortName[language as keyof typeof line.shortName]} -{" "}
                {line.name[language as keyof typeof line.name]}
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

              // Check if this is the selected station
              const isSelected = selectedStation?.id === station.id;

              return (
                <div
                  key={station.id}
                  className={`absolute w-4 h-4 bg-white border-2 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform ${
                    isInterchange
                      ? "w-5 h-5 -translate-x-2.5 -translate-y-2.5"
                      : ""
                  } ${station.isTerminal ? "border-4" : "border-2"} ${
                    isSelected ? "ring-4 ring-purple-400" : ""
                  }`}
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

        {/* Station Detail Popup */}
        {selectedStation && (
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center z-20">
            <div className="relative bg-white rounded-lg shadow-xl w-full h-full overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold text-gray-800">
                  {
                    selectedStation.name[
                      language as keyof typeof selectedStation.name
                    ]
                  }
                </h3>
                <button
                  onClick={closeStationDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-4">
                {stationLoading ? (
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center py-8 items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : stationDetails ? (
                  <div>
                    {/* Station Information */}
                    <div className="mb-4">
                      {stationDetails.content?.rendered && (
                        <div
                          className="prose max-w-none mb-4"
                          dangerouslySetInnerHTML={{
                            __html:
                              stationDetails.content.rendered.split(
                                `<h2>${
                                  stationDetails?.title.rendered.split(
                                    " (Ga"
                                  )[0]
                                } map</h2>`
                              )[0] || stationDetails.content.rendered,
                          }}
                        />
                      )}
                    </div>
                    {/* Station Map */}
                    <div className="mt-6">
                      <h4 className="font-bold text-lg mb-2">
                        {t("stationMap")}
                      </h4>

                      {getStationMapIframe() ? (
                        <div
                          className="w-full"
                          dangerouslySetInnerHTML={{
                            __html: getStationMapIframe() || "",
                          }}
                        />
                      ) : (
                        <div className="bg-gray-100 p-4 rounded-md text-center">
                          <p className="text-gray-500">
                            {t("mapNotAvailable")}
                          </p>
                        </div>
                      )}

                      {/* Link to full page */}
                      <div className="mt-4 text-right">
                        <a
                          href={`https://hochiminhcitymetro.com/station/${selectedStation?.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-purple-600 hover:text-purple-800"
                        >
                          {t("viewFullDetails")}
                          <FaExternalLinkAlt className="ml-1 text-xs" />
                        </a>
                      </div>
                    </div>
                    {/* Station Features */}
                    {selectedStation.features &&
                      selectedStation.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-bold text-lg mb-2">
                            {t("stationFeatures")}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStation.features.map((feature, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Nearby Attractions */}
                    {selectedStation.nearbyAttractions &&
                      selectedStation.nearbyAttractions.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-bold text-lg mb-2">
                            {t("nearbyAttractions")}
                          </h4>
                          <ul className="list-disc pl-5">
                            {selectedStation.nearbyAttractions.map(
                              (attraction, index) => (
                                <li key={index} className="text-gray-700">
                                  {attraction}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {t("noDetailedInformation")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metro Line Info from WordPress */}
      {loading ? (
        <div className="mt-4 p-3 bg-purple-50 rounded-md flex justify-center">
          <div className="animate-pulse h-4 bg-purple-200 rounded w-full"></div>
        </div>
      ) : error ? (
        <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-100">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={handleRetry}
            className="text-red-600 text-xs mt-2 hover:underline"
          >
            {t("tryAgain")}
          </button>
        </div>
      ) : metroLineInfo ? (
        <div className="mt-4 p-3 bg-purple-50 rounded-md text-sm text-gray-700 border border-purple-100">
          <h3 className="font-bold text-purple-700 mb-1">{t("aboutLine1")}</h3>
          <p>{metroLineInfo}</p>
          <button
            onClick={() =>
              window.open("https://hochiminhcitymetro.com/line-1/", "_blank")
            }
            className="text-purple-600 text-xs mt-2 hover:underline"
          >
            {t("readMore")}
          </button>
        </div>
      ) : null}

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
