import React from "react";

const LocationMap: React.FC = () => {
  return (
    <div className="w-full h-96 bg-gray-200 mt-8">
      {/* Replace with actual Google Maps embed or other map component */}
      <div className="w-full h-full flex items-center justify-center bg-gray-300">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-gray-600">Google Maps will be displayed here</p>
          <p className="text-gray-500 text-sm mt-2">
            1175A Đ. 3 Tháng 2, Khu Phố 4, Quận 11, Hồ Chí Minh
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;