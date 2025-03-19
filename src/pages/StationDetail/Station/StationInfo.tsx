import React from "react";
import type { MetroStation } from "@data/metroLines";
import type { WPPage } from "@services/api/WordPressService";
import { useTranslation } from "@hooks/useTranslation";

interface StationInfoProps {
  station: MetroStation;
  stationDetails: WPPage | null;
}

const StationInfo: React.FC<StationInfoProps> = ({
  station,
  stationDetails,
}) => {
  const { language } = useTranslation();

  const getStationContent = () => {
    if (!stationDetails?.content?.rendered) return null;

    // Split content to get only the descriptive part
    const content =
      stationDetails.content.rendered.split(
        `<h2>${stationDetails?.title.rendered.split(" (Ga")[0]} map</h2>`
      )[0] || stationDetails.content.rendered;

    return content;
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {station.name[language as keyof typeof station.name]}
      </h2>

      {stationDetails?.content?.rendered ? (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: getStationContent() || "" }}
        />
      ) : (
        <p className="text-gray-600">
          No detailed information available for this station.
        </p>
      )}
    </div>
  );
};

export default StationInfo;
