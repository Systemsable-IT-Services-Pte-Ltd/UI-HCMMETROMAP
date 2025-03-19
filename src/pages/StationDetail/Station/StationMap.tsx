import React from "react";
import type { MetroStation } from "@data/metroLines";
import type { WPPage } from "@services/api/WordPressService";
import { useTranslation } from "@hooks/useTranslation";
import { useWindowSize } from "@hooks/useWindowSize";
import { FaExternalLinkAlt } from "react-icons/fa";

interface StationMapProps {
  station: MetroStation;
  stationDetails: WPPage | null;
}

const StationMap: React.FC<StationMapProps> = ({ station, stationDetails }) => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();

  const getStationMapIframe = () => {
    if (!stationDetails?.content?.rendered) return null;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = stationDetails.content.rendered;

    const iframe = tempDiv.querySelector("iframe");

    if (iframe) {
      iframe.setAttribute("loading", "async");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", isMobile ? "350" : "500");
      iframe.style.border = "0";
      return iframe.outerHTML;
    }
    return null;
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        {t("stationMap")}
      </h3>

      {getStationMapIframe() ? (
        <div
          className="w-full rounded-lg overflow-hidden"
          dangerouslySetInnerHTML={{ __html: getStationMapIframe() || "" }}
        />
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-500">{t("mapNotAvailable")}</p>
        </div>
      )}

      <div className="mt-4 text-right">
        <a
          href={`https://hochiminhcitymetro.com/station/${station?.slug}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-purple-600 hover:text-purple-800"
        >
          {t("viewFullDetails")}
          <FaExternalLinkAlt className="ml-1 text-xs" />
        </a>
      </div>
    </div>
  );
};

export default StationMap;
