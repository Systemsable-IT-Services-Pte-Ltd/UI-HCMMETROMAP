import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoaderProps {
  type:
    | "text"
    | "title"
    | "paragraph"
    | "image"
    | "avatar"
    | "button"
    | "card"
    | "table"
    | "post"
    | "metroCard"
    | "post-detail";
  count?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  circle?: boolean;
  style?: React.CSSProperties;
  inline?: boolean;
}

/**
 * Custom skeleton loader component that provides various preset skeleton types
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type,
  count = 1,
  width,
  height,
  className = "",
  circle = false,
  style = {},
  inline = false,
}) => {
  // Base styles for different types of skeletons
  const baseStyles: Record<string, React.CSSProperties> = {
    text: { width: width || "100%", height: height || 16 },
    title: { width: width || "70%", height: height || 24, marginBottom: 12 },
    paragraph: {
      width: width || "100%",
      height: height || 16,
      marginBottom: 8,
    },
    image: { width: width || "100%", height: height || 200, borderRadius: 8 },
    avatar: { width: width || 40, height: height || 40, borderRadius: "50%" },
    button: { width: width || 100, height: height || 38, borderRadius: 4 },
    card: { width: width || "100%", height: height || 320, borderRadius: 8 },
    table: { width: width || "100%", height: height || 200 },
  };

  // Composite skeletons for specific components
  if (type === "post") {
    return (
      <div
        className={`bg-white p-6 rounded-lg shadow-sm ${className}`}
        style={style}
      >
        {/* Ngày */}
        <Skeleton width="25%" height={16} className="mb-3" />

        {/* Tiêu đề */}
        <Skeleton height={24} className="mb-2" />
        <Skeleton width="50%" height={24} className="mb-4" />

        {/* Nội dung */}
        <div className="space-y-2 mb-4">
          <Skeleton count={3} height={16} />
        </div>

        {/* Nút Read More */}
        <div className="mt-4 flex justify-start">
          <Skeleton width={80} height={16} />
        </div>
      </div>
    );
  }

  if (type === "metroCard") {
    return (
      <div
        className={`bg-white p-4 rounded-lg shadow-sm ${className}`}
        style={style}
      >
        {/* Header with icon */}
        <div className="flex items-center mb-4">
          <Skeleton circle width={40} height={40} className="mr-3" />
          <div>
            <Skeleton width={120} height={20} className="mb-1" />
            <Skeleton width={80} height={14} />
          </div>
        </div>

        {/* Main content */}
        <Skeleton height={12} className="mb-2" />
        <Skeleton height={12} className="mb-2" width="90%" />
        <Skeleton height={12} className="mb-3" width="75%" />

        {/* Status indicators */}
        <div className="flex justify-between mt-4">
          <Skeleton width={60} height={24} borderRadius={12} />
          <Skeleton width={40} height={24} />
        </div>
      </div>
    );
  }

  if (type === "post-detail") {
    return (
      <div>
        <Skeleton height={32} width={150} className="mb-2" />
        <Skeleton height={55} className="mb-8" />
        <Skeleton height={350} className="mb-8" />
        <Skeleton height={20} count={3} className="mb-4" />
        <Skeleton height={200} className="mb-6" />
        <Skeleton height={20} count={5} className="mb-4" />
        <Skeleton height={150} className="mb-6" />
        <Skeleton height={20} count={3} />
      </div>
    );
  }

  // Default skeleton types
  const skeletonStyle = baseStyles[type] || {};
  const combinedStyle = { ...skeletonStyle, ...style };

  return inline ? (
    <span className={className}>
      <Skeleton
        count={count}
        width={combinedStyle.width}
        height={combinedStyle.height}
        borderRadius={combinedStyle.borderRadius}
        circle={circle}
        style={combinedStyle}
      />
    </span>
  ) : (
    <div className={className}>
      <Skeleton
        count={count}
        width={combinedStyle.width}
        height={combinedStyle.height}
        borderRadius={combinedStyle.borderRadius}
        circle={circle}
        style={combinedStyle}
      />
    </div>
  );
};

export default SkeletonLoader;
