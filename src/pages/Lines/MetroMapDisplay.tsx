import React from "react";
import { MetroLine } from "./Types";
import { generateLinePath, getStationCoordinates } from "./Utils";
import SelectedLineMap from "./SelectedLineMap";

interface MetroMapDisplayProps {
  metroLines: MetroLine[];
  selectedLine: string | null;
}

const MetroMapDisplay: React.FC<MetroMapDisplayProps> = ({
  metroLines,
  selectedLine,
}) => {
  return (
    <div className="w-full h-[500px] bg-gray-100 mb-6 relative border border-gray-300 rounded-lg overflow-hidden">
      {/* Placeholder for the full metro map */}
      {!selectedLine && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full p-4">
            <svg viewBox="0 0 1000 600" className="w-full h-full">
              {/* Background map element */}
              <rect x="0" y="0" width="1000" height="600" fill="#f8f8f8" />

              {/* Draw all metro lines */}
              {metroLines.map((line) => (
                <g key={line.id}>
                  {/* Draw the line */}
                  <path
                    d={generateLinePath(line.id)}
                    stroke={line.color}
                    strokeWidth="8"
                    fill="none"
                  />

                  {/* Draw stations for this line */}
                  {line.stations.map((station, idx) => {
                    const coords = getStationCoordinates(line.id, idx);
                    return (
                      <g key={`${line.id}-${idx}`}>
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="6"
                          fill="white"
                          stroke={line.color}
                          strokeWidth="3"
                        />
                        {/* Show station names with better positioning */}
                        <text
                          x={coords.x + 10}
                          y={
                            coords.y +
                            (idx % 3 === 0 ? -15 : idx % 3 === 1 ? 0 : 15)
                          }
                          fontSize="12"
                          fill="#333"
                          textAnchor="start"
                          dominantBaseline="middle"
                        >
                          {station}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(50, 450)">
                <rect
                  x="-10"
                  y="-20"
                  width="400"
                  height="150"
                  fill="rgba(255,255,255,0.8)"
                  rx="5"
                />
                <text x="0" y="-5" fontSize="14" fontWeight="bold">
                  HCMC Metro Lines:
                </text>
                {metroLines.map((line, idx) => (
                  <g
                    key={line.id}
                    transform={`translate(0, ${idx * 20 + 15})`}
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="30"
                      y2="0"
                      stroke={line.color}
                      strokeWidth="4"
                    />
                    <text
                      x="40"
                      y="0"
                      dominantBaseline="middle"
                      fontSize="12"
                    >
                      {line.name}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Individual line map */}
      {selectedLine && (
        <div className="absolute inset-0">
          <div className="w-full h-full">
            <SelectedLineMap lineId={selectedLine} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetroMapDisplay;