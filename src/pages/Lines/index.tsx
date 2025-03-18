import React, { useState } from "react";
import { metroLines } from "./Data";
import HeaderSection from "./HeaderSection";
import LineSelector from "./LineSelector";
import MetroMapDisplay from "./MetroMapDisplay";
import StationsList from "./StationsList";

const Lines: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  return (
    <div className="w-full">
      <HeaderSection />
      
      <div className="mx-auto p-4 max-w-6xl">
        <LineSelector 
          metroLines={metroLines} 
          selectedLine={selectedLine} 
          setSelectedLine={setSelectedLine} 
        />
        
        <MetroMapDisplay 
          metroLines={metroLines} 
          selectedLine={selectedLine} 
        />
        
        <StationsList 
          selectedLine={selectedLine} 
          metroLines={metroLines} 
        />
      </div>
    </div>
  );
};

export default Lines;