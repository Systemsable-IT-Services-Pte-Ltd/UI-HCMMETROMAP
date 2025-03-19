import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "purple-500",
}) => {
  const sizeClass = {
    small: "h-6 w-6",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeClass[size]}`}
        style={{
          borderTopColor: `var(--color-${color})`,
          borderBottomColor: `var(--color-${color})`,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
