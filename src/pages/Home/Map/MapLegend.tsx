import React from "react";
import { useTranslation } from "@hooks/useTranslation";
import type { MetroLine } from "@data/metroLines";

interface MapLegendProps {
  displayLines: Record<string, MetroLine>;
}

const MapLegend: React.FC<MapLegendProps> = ({ displayLines }) => {
  const { t, language } = useTranslation();

  return (
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
  );
};

export default MapLegend;
