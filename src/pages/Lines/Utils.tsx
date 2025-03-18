
import { metroLines } from './Data';

// Helper function to generate path for each metro line
export function generateLinePath(lineId: string): string {
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
export function getStationCoordinates(lineId: string, stationIndex: number) {
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