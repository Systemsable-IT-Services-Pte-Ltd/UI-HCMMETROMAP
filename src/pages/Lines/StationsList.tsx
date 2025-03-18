import React from "react";
import { MetroLine } from "./Types";

interface StationsListProps {
  selectedLine: string | null;
  metroLines: MetroLine[];
}

const StationsList: React.FC<StationsListProps> = ({
  selectedLine,
  metroLines,
}) => {
  if (!selectedLine) return null;

  const line = metroLines.find((l) => l.id === selectedLine);
  if (!line) return null;

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <h2
        className="text-xl font-bold mb-4"
        style={{
          color: line.color,
        }}
      >
        {line.name}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {line.stations.map((station, idx) => (
          <div key={idx} className="p-2 bg-gray-100 rounded">
            <span className="font-bold mr-2">{idx + 1}.</span>
            {station}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationsList;
