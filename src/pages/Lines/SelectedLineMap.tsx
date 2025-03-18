import React from "react";
import { metroLines } from "./Data";

interface SelectedLineMapProps {
  lineId: string;
}

const SelectedLineMap: React.FC<SelectedLineMapProps> = ({ lineId }) => {
  const line = metroLines.find((l) => l.id === lineId);
  if (!line) return null;

  return (
    <svg viewBox="0 0 1000 600" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="1000" height="600" fill="#f8f8f8" />

      {/* Expanded rail line */}
      <path
        d={`M 50,300 Q 25,300 0,300 L 1000,300 Q 1025,300 1050,300`}
        stroke={line.color}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

      {/* Line name */}
      <text
        x="500"
        y="80"
        fontSize="28"
        fill={line.color}
        textAnchor="middle"
        fontWeight="bold"
      >
        {line.name}
      </text>

      {/* Stations */}
      {line.stations.map((station, idx) => {
        const stationCount = line.stations.length;
        const edgePadding = 50;
        const availableWidth = 900;
        const x = edgePadding + (availableWidth / (stationCount - 1)) * idx;

        return (
          <g key={idx}>
            <circle
              cx={x}
              cy={300}
              r={idx === 0 || idx === stationCount - 1 ? "14" : "10"}
              fill="white"
              stroke={line.color}
              strokeWidth="5"
            />
            <text
              x={x}
              y={idx % 2 === 0 ? 260 : 340}
              fontSize="16"
              fill="#333"
              textAnchor="middle"
              fontWeight={
                idx === 0 || idx === stationCount - 1 ? "bold" : "normal"
              }
            >
              {station}
            </text>
            <text
              x={x}
              y={idx % 2 === 0 ? 240 : 360}
              fontSize="14"
              fill="#666"
              textAnchor="middle"
            >
              Station {idx + 1}
            </text>
          </g>
        );
      })}

      {/* Additional information */}
      <text x="500" y="520" fontSize="16" fill="#666" textAnchor="middle">
        Total stations: {line.stations.length}
      </text>
    </svg>
  );
};

export default SelectedLineMap;