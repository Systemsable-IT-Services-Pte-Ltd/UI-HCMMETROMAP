export interface MetroStation {
  id: string;
  name: {
    en: string;
    vi: string;
  };
  coordinates: {
    x: number; // For visualization on our custom map
    y: number;
    lat?: number; // Actual latitude if we want to use real maps
    lng?: number; // Actual longitude if we want to use real maps
  };
  features: string[]; // Available features at the station
  isInterchange: boolean; // Whether this station connects to other lines
  interchangeLines?: string[]; // IDs of connecting lines
  isTerminal: boolean; // Whether this is a terminal station
  exits?: string[]; // Exit points/directions
  nearbyAttractions?: string[]; // Points of interest near the station
  slug: string; // Add slug field for URL
}

export interface MetroLine {
  id: string;
  name: {
    en: string;
    vi: string;
  };
  shortName: {
    en: string;
    vi: string;
  };
  color: string; // Color code for the line
  stations: string[]; // IDs of stations on this line in order
  status: "operational" | "under-construction" | "planned";
  openingDate?: string; // ISO date string for operational lines
  length: number; // Length in kilometers
  type: "metro" | "monorail" | "tramway" | "light-rail";
}

// Data for Line 1 stations
export const metroStations: Record<string, MetroStation> = {
  "L1-01": {
    id: "L1-01",
    name: {
      en: "Ben Thanh",
      vi: "Bến Thành",
    },
    slug: "ben-thanh",
    coordinates: {
      x: 50,
      y: 50,
      lat: 10.7731,
      lng: 106.6983,
    },
    features: [
      "elevator",
      "ticket-office",
      "restroom",
      "information-desk",
      "security",
    ],
    isInterchange: true,
    interchangeLines: ["line-2", "line-3a", "line-4"],
    isTerminal: true,
    exits: [
      "Ben Thanh Market",
      "Le Loi Street",
      "Nguyen Hue Walking Street",
      "Pham Ngu Lao Street",
    ],
    nearbyAttractions: [
      "Ben Thanh Market",
      "Saigon Square",
      "Bitexco Financial Tower",
    ],
  },
  "L1-02": {
    id: "L1-02",
    name: {
      en: "Opera House",
      vi: "Nhà hát Thành phố",
    },
    slug: "opera-house",
    coordinates: {
      x: 70,
      y: 50,
      lat: 10.7767,
      lng: 106.7031,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Dong Khoi Street", "Le Loi Street"],
    nearbyAttractions: [
      "Saigon Opera House",
      "Nguyen Hue Walking Street",
      "Hotel Continental",
    ],
  },
  "L1-03": {
    id: "L1-03",
    name: {
      en: "Ba Son",
      vi: "Ba Son",
    },
    slug: "ba-son",
    coordinates: {
      x: 90,
      y: 50,
      lat: 10.7864,
      lng: 106.7078,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Ton Duc Thang Street", "Nguyen Huu Canh Street"],
    nearbyAttractions: ["Ba Son Shipyard Historical Site", "Saigon River"],
  },
  "L1-04": {
    id: "L1-04",
    name: {
      en: "Van Thanh Park",
      vi: "Văn Thánh",
    },
    slug: "van-thanh-park",
    coordinates: {
      x: 110,
      y: 60,
      lat: 10.7953,
      lng: 106.7172,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Dien Bien Phu Street", "Nguyen Huu Canh Street"],
    nearbyAttractions: ["Van Thanh Park", "Van Thanh Tourist Village"],
  },
  "L1-05": {
    id: "L1-05",
    name: {
      en: "Tan Cang",
      vi: "Tân Cảng",
    },
    slug: "tan-cang",
    coordinates: {
      x: 130,
      y: 70,
      lat: 10.8022,
      lng: 106.7256,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Dien Bien Phu Street", "Nguyen Huu Canh Street"],
    nearbyAttractions: ["Tan Cang Port", "Saigon Pearl Residential Complex"],
  },
  "L1-06": {
    id: "L1-06",
    name: {
      en: "Thao Dien",
      vi: "Thảo Điền",
    },
    slug: "thao-dien",
    coordinates: {
      x: 150,
      y: 80,
      lat: 10.8072,
      lng: 106.7328,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "Thao Dien Street"],
    nearbyAttractions: ["Thao Dien Pearl Plaza", "International Schools Area"],
  },
  "L1-07": {
    id: "L1-07",
    name: {
      en: "An Phu",
      vi: "An Phú",
    },
    slug: "an-phu",
    coordinates: {
      x: 170,
      y: 90,
      lat: 10.8039,
      lng: 106.7467,
    },
    features: ["elevator", "ticket-office", "restroom", "parking"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "Luong Dinh Cua Street"],
    nearbyAttractions: ["Metro An Phu Supermarket", "An Phu Supermarket"],
  },
  "L1-08": {
    id: "L1-08",
    name: {
      en: "Rach Chiec",
      vi: "Rạch Chiếc",
    },
    slug: "rach-chiec",
    coordinates: {
      x: 190,
      y: 100,
      lat: 10.8019,
      lng: 106.7664,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "Rach Chiec Sports Complex"],
    nearbyAttractions: ["Rach Chiec Sports Complex", "Rach Chiec Canal"],
  },
  "L1-09": {
    id: "L1-09",
    name: {
      en: "Phuoc Long",
      vi: "Phước Long",
    },
    slug: "phuoc-long",
    coordinates: {
      x: 210,
      y: 110,
      lat: 10.8011,
      lng: 106.7789,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "Phuoc Long Area"],
    nearbyAttractions: ["Phuoc Long Residential Area"],
  },
  "L1-10": {
    id: "L1-10",
    name: {
      en: "Binh Thai",
      vi: "Bình Thái",
    },
    slug: "binh-thai",
    coordinates: {
      x: 230,
      y: 120,
      lat: 10.8003,
      lng: 106.7894,
    },
    features: ["elevator", "ticket-office", "restroom"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "Binh Thai Intersection"],
    nearbyAttractions: ["Binh Thai Intersection"],
  },
  "L1-11": {
    id: "L1-11",
    name: {
      en: "Thu Duc",
      vi: "Thủ Đức",
    },
    slug: "thu-duc",
    coordinates: {
      x: 250,
      y: 130,
      lat: 10.7992,
      lng: 106.8019,
    },
    features: ["elevator", "ticket-office", "restroom", "parking"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "Vo Van Ngan Street"],
    nearbyAttractions: [
      "Thu Duc District Administrative Center",
      "Thu Duc Market",
    ],
  },
  "L1-12": {
    id: "L1-12",
    name: {
      en: "Hi-Tech Park",
      vi: "Khu Công nghệ cao",
    },
    slug: "hi-tech-park",
    coordinates: {
      x: 270,
      y: 140,
      lat: 10.7981,
      lng: 106.8142,
    },
    features: ["elevator", "ticket-office", "restroom", "parking"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "SHTP Main Gate"],
    nearbyAttractions: ["Saigon Hi-Tech Park", "FPT Software Campus"],
  },
  "L1-13": {
    id: "L1-13",
    name: {
      en: "National University",
      vi: "Đại học Quốc gia",
    },
    slug: "national-university",
    coordinates: {
      x: 290,
      y: 150,
      lat: 10.7972,
      lng: 106.8256,
    },
    features: ["elevator", "ticket-office", "restroom", "parking"],
    isInterchange: false,
    isTerminal: false,
    exits: ["Hanoi Highway", "Vietnam National University Campus"],
    nearbyAttractions: [
      "Vietnam National University Ho Chi Minh City",
      "University of Technology",
    ],
  },
  "L1-14": {
    id: "L1-14",
    name: {
      en: "Suoi Tien Terminal",
      vi: "Bến xe Suối Tiên",
    },
    slug: "suoi-tien-terminal",
    coordinates: {
      x: 310,
      y: 160,
      lat: 10.7964,
      lng: 106.8356,
    },
    features: [
      "elevator",
      "ticket-office",
      "restroom",
      "information-desk",
      "security",
      "parking",
      "bus-interchange",
    ],
    isInterchange: true,
    interchangeLines: ["line-5"],
    isTerminal: true,
    exits: ["Hanoi Highway", "Suoi Tien Bus Terminal", "Suoi Tien Theme Park"],
    nearbyAttractions: [
      "Suoi Tien Theme Park",
      "Suoi Tien Bus Terminal",
      "Suoi Tien Cultural Park",
    ],
  },
};

// Data for Line 1
export const metroLines: Record<string, MetroLine> = {
  "line-1": {
    id: "line-1",
    name: {
      en: "Ben Thanh - Suoi Tien",
      vi: "Bến Thành - Suối Tiên",
    },
    shortName: {
      en: "Line 1",
      vi: "Tuyến 1",
    },
    color: "#E91E63", // Pink color
    stations: [
      "L1-01",
      "L1-02",
      "L1-03",
      "L1-04",
      "L1-05",
      "L1-06",
      "L1-07",
      "L1-08",
      "L1-09",
      "L1-10",
      "L1-11",
      "L1-12",
      "L1-13",
      "L1-14",
    ],
    status: "operational",
    openingDate: "2024-12-22",
    length: 19.7,
    type: "metro",
  },
};

// Planned and under construction lines
export const plannedLines: Record<string, MetroLine> = {
  "line-2": {
    id: "line-2",
    name: {
      en: "Ben Thanh - Tham Luong",
      vi: "Bến Thành - Tham Lương",
    },
    shortName: {
      en: "Line 2",
      vi: "Tuyến 2",
    },
    color: "#2196F3", // Blue color
    stations: [], // Would be populated with actual stations
    status: "under-construction",
    length: 11.3,
    type: "metro",
  },
  "line-3a": {
    id: "line-3a",
    name: {
      en: "Ben Thanh - Tan Kien",
      vi: "Bến Thành - Tân Kiên",
    },
    shortName: {
      en: "Line 3A",
      vi: "Tuyến 3A",
    },
    color: "#4CAF50", // Green color
    stations: [], // Would be populated with actual stations
    status: "planned",
    length: 19.8,
    type: "metro",
  },
  "line-3b": {
    id: "line-3b",
    name: {
      en: "Cong Hoa Roundabout - Hiep Binh Phuoc",
      vi: "Vòng xoay Cộng Hòa - Hiệp Bình Phước",
    },
    shortName: {
      en: "Line 3B",
      vi: "Tuyến 3B",
    },
    color: "#4CAF50", // Green color (same as 3A)
    stations: [], // Would be populated with actual stations
    status: "planned",
    length: 12.8,
    type: "metro",
  },
  "line-4": {
    id: "line-4",
    name: {
      en: "Thanh Xuan - Hiep Phuoc Port",
      vi: "Thạnh Xuân - Cảng Hiệp Phước",
    },
    shortName: {
      en: "Line 4",
      vi: "Tuyến 4",
    },
    color: "#FFC107", // Amber color
    stations: [], // Would be populated with actual stations
    status: "planned",
    length: 36.0,
    type: "metro",
  },
  "line-5": {
    id: "line-5",
    name: {
      en: "Bay Hien Intersection - Saigon Bridge",
      vi: "Ngã tư Bảy Hiền - Cầu Sài Gòn",
    },
    shortName: {
      en: "Line 5",
      vi: "Tuyến 5",
    },
    color: "#9C27B0", // Purple color
    stations: [], // Would be populated with actual stations
    status: "planned",
    length: 8.9,
    type: "metro",
  },
};

export default {
  metroStations,
  metroLines,
  plannedLines,
};
