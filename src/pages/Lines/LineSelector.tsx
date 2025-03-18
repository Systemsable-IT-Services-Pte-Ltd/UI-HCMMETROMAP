import React from "react";
import { MetroLine } from "./Types";

interface LineSelectorProps {
  metroLines: MetroLine[];
  selectedLine: string | null;
  setSelectedLine: (id: string | null) => void;
}

const LineSelector: React.FC<LineSelectorProps> = ({
  metroLines,
  selectedLine,
  setSelectedLine,
}) => {
  return (
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
  );
};

export default LineSelector;