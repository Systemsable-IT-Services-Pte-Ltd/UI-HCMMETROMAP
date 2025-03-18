interface MetroLine {
  id: string;
  name: string;
  color: string;
  stations: string[];
}

export const metroLines: MetroLine[] = [
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