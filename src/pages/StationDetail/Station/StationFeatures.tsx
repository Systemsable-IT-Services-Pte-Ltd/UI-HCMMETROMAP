import React from "react";
import type { MetroStation } from "@data/metroLines";
import { useTranslation } from "@hooks/useTranslation";

interface StationFeaturesProps {
  station: MetroStation;
}

const StationFeatures: React.FC<StationFeaturesProps> = ({ station }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {/* Station Features */}
      {station.features && station.features.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-gray-800">
            {t("stationFeatures")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {station.features.map((feature, index) => (
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
      {station.nearbyAttractions && station.nearbyAttractions.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-800">
            {t("nearbyAttractions")}
          </h3>
          <ul className="list-disc pl-5">
            {station.nearbyAttractions.map((attraction, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {attraction}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!station.features?.length && !station.nearbyAttractions?.length && (
        <p className="text-gray-500 text-center py-4">
          {t("noAdditionalInfo")}
        </p>
      )}
    </div>
  );
};

export default StationFeatures;
