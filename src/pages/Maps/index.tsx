import React, { useState } from "react";
import hcmcBackground from "@assets/images/backround/hcmcmetro-background.jpg";

interface MetroLine {
  id: string;
  name: string;
  color: string;
  stations: string[];
}

const Maps: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  // HCMC Metro line data
  const metroLines: MetroLine[] = [
    {
      id: "line1",
      name: "Line 1 (Ben Thanh - Suoi Tien)",
      color: "#E31937",
      stations: [
        "Ben Thanh",
        "Opera House",
        "Ba Son",
        "Van Thanh",
        "Tan Cang",
        "Thao Dien",
        "An Phu",
        "Rach Chiec",
        "Phuoc Long",
        "Binh Thai",
        "Thu Duc",
        "Hiep Binh Phuoc",
        "Suoi Tien",
        "Suoi Tien Bus Terminal",
      ],
    },
    {
      id: "line2",
      name: "Line 2 (Ben Thanh - Tham Luong)",
      color: "#0070C0",
      stations: [
        "Ben Thanh",
        "Tao Dan",
        "Dan Chu",
        "Hoa Hung",
        "Le Thi Rieng",
        "Pham Van Hai",
        "Ba Queo",
        "Tham Luong",
      ],
    },
    {
      id: "line3a",
      name: "Line 3a (Ben Thanh - Tan Kien)",
      color: "#7030A0",
      stations: [
        "Ben Thanh",
        "Vo Van Kiet",
        "Khanh Hoi Bridge",
        "Nguyen Van Linh",
        "Tan Kien",
      ],
    },
    {
      id: "line4",
      name: "Line 4 (Thanh Xuan - Hiep Phuoc)",
      color: "#00B050",
      stations: [
        "Thanh Xuan",
        "Go Vap Station",
        "Phan Dang Luu",
        "Ba Son",
        "Khanh Hoi",
        "Nguyen Van Linh",
        "Hiep Phuoc",
      ],
    },
    {
      id: "line5",
      name: "Line 5 (Can Giuoc - Saigon Bridge)",
      color: "#FFC000",
      stations: [
        "Can Giuoc",
        "Tan Chanh Hiep",
        "An Suong",
        "Go Vap",
        "Tan Binh",
        "Bay Hien",
        "Nguyen Van Cu",
        "Saigon Bridge",
      ],
    },
  ];

  return (
    <div className="w-full">
<div
  className="relative w-full min-h-[500px] flex items-center justify-center bg-center bg-cover bg-no-repeat"
  style={{
    backgroundImage: `url(${hcmcBackground})`, // Using the same background image from Contact component
  }}
>
  {/* Overlay mờ tím/pink */}
  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />

  {/* Nội dung */}
  <div className="relative container mx-auto px-4 text-center z-10 flex flex-col justify-center items-center h-full">
    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
      HCMC Metro Map
    </h1>
    <p className="text-xl max-w-2xl mx-auto text-white">
      Explore Ho Chi Minh City's metro network. View all planned lines and stations to help plan your journey across the city.
    </p>
  </div>
</div>

      <div className="mx-auto p-4 max-w-6xl">
      {/* Metro Line Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            !selectedLine ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedLine(null)}
        >
          All Lines
        </button>

        {metroLines.map((line) => (
          <button
            key={line.id}
            className={`px-4 py-2 rounded-md text-white`}
            style={{
              backgroundColor:
                selectedLine === line.id ? line.color : `${line.color}99`,
            }}
            onClick={() => setSelectedLine(line.id)}
          >
            {line.name}
          </button>
        ))}
      </div>

      {/* Metro Map Display */}
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
              {renderSelectedLineMap(selectedLine)}
            </div>
          </div>
        )}
      </div>

      {/* Stations List */}
      {selectedLine && (
        <div className="border border-gray-300 rounded-lg p-4">
          <h2
            className="text-xl font-bold mb-4"
            style={{
              color: metroLines.find((l) => l.id === selectedLine)?.color,
            }}
          >
            {metroLines.find((l) => l.id === selectedLine)?.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {metroLines
              .find((l) => l.id === selectedLine)
              ?.stations.map((station, idx) => (
                <div key={idx} className="p-2 bg-gray-100 rounded">
                  <span className="font-bold mr-2">{idx + 1}.</span>
                  {station}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

// Helper function to generate path for each metro line
function generateLinePath(lineId: string): string {
  // Improved paths with better spacing within the viewport
  switch (lineId) {
    case "line1":
      return "M 100,200 C 250,200 400,180 550,160 S 750,140 900,120";
    case "line2":
      return "M 100,200 C 250,220 400,240 550,260 S 750,280 900,300";
    case "line3a":
      return "M 100,200 C 250,240 400,280 550,320 S 750,360 900,400";
    case "line4":
      return "M 150,120 C 300,160 450,200 600,240 S 750,280 900,320";
    case "line5":
      return "M 50,280 C 200,240 350,200 500,160 S 650,200 800,240";
    default:
      return "";
  }
}

// Helper function to get coordinates for stations
function getStationCoordinates(lineId: string, stationIndex: number) {
  // More evenly spaced station coordinates
  const line = metroLines.find((l) => l.id === lineId);
  if (!line) return { x: 0, y: 0 };

  const stationCount = line.stations.length;
  const t = stationIndex / (stationCount - 1);

  // Base coordinates that follow the path shape
  const baseX = 100 + 800 * t;
  let baseY = 0;
  switch (lineId) {
    case "line1":
      baseY = 200 - 80 * t;
      break;
    case "line2":
      baseY = 200 + 100 * t;
      break;
    case "line3a":
      baseY = 200 + 200 * t;
      break;
    case "line4":
      baseY = 120 + 200 * t;
      break;
    case "line5":
      baseY = 280 - 120 * Math.sin(t * Math.PI);
      break;
  }

  return { x: baseX, y: baseY };
}

// Helper function to render a detailed view of a selected line
function renderSelectedLineMap(lineId: string) {
  const line = metroLines.find((l) => l.id === lineId);
  if (!line) return null;

  return (
    <svg viewBox="0 0 1000 600" className="w-full h-full">
      {/* Bỏ rectangular background để tràn khung */}
      <rect x="0" y="0" width="1000" height="600" fill="#f8f8f8" />

      {/* Mở rộng đường ray đến kích thước tối đa */}
      <path
        d={`M 50,300 Q 25,300 0,300 L 1000,300 Q 1025,300 1050,300`}
        stroke={line.color}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

      {/* Line name - đưa lên cao hơn */}
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

      {/* Stations - mở rộng khoảng cách */}
      {line.stations.map((station, idx) => {
        const stationCount = line.stations.length;
        // Mở rộng padding hai bên
        const edgePadding = 50;
        // Sử dụng toàn bộ chiều rộng có sẵn
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

      {/* Additional information - đưa xuống dưới */}
      <text x="500" y="520" fontSize="16" fill="#666" textAnchor="middle">
        Total stations: {line.stations.length}
      </text>
    </svg>
  );
}
// Metro lines data to be used throughout the component
const metroLines = [
  {
    id: "line1",
    name: "Line 1 (Ben Thanh - Suoi Tien)",
    color: "#E31937",
    stations: [
      "Ben Thanh",
      "Opera House",
      "Ba Son",
      "Van Thanh",
      "Tan Cang",
      "Thao Dien",
      "An Phu",
      "Rach Chiec",
      "Phuoc Long",
      "Binh Thai",
      "Thu Duc",
      "Hiep Binh Phuoc",
      "Suoi Tien",
      "Suoi Tien Bus Terminal",
    ],
  },
  {
    id: "line2",
    name: "Line 2 (Ben Thanh - Tham Luong)",
    color: "#0070C0",
    stations: [
      "Ben Thanh",
      "Tao Dan",
      "Dan Chu",
      "Hoa Hung",
      "Le Thi Rieng",
      "Pham Van Hai",
      "Ba Queo",
      "Tham Luong",
    ],
  },
  {
    id: "line3a",
    name: "Line 3a (Ben Thanh - Tan Kien)",
    color: "#7030A0",
    stations: [
      "Ben Thanh",
      "Vo Van Kiet",
      "Khanh Hoi Bridge",
      "Nguyen Van Linh",
      "Tan Kien",
    ],
  },
  {
    id: "line4",
    name: "Line 4 (Thanh Xuan - Hiep Phuoc)",
    color: "#00B050",
    stations: [
      "Thanh Xuan",
      "Go Vap Station",
      "Phan Dang Luu",
      "Ba Son",
      "Khanh Hoi",
      "Nguyen Van Linh",
      "Hiep Phuoc",
    ],
  },
  {
    id: "line5",
    name: "Line 5 (Can Giuoc - Saigon Bridge)",
    color: "#FFC000",
    stations: [
      "Can Giuoc",
      "Tan Chanh Hiep",
      "An Suong",
      "Go Vap",
      "Tan Binh",
      "Bay Hien",
      "Nguyen Van Cu",
      "Saigon Bridge",
    ],
  },
];

export default Maps;
