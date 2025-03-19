import { useScrollToTop } from "@hooks/useScrollToTop";
import React from "react";

import { FaArrowUp } from "react-icons/fa";

interface ScrollToTopButtonProps {
  /**
   * Khoảng cách scroll (px) trước khi hiển thị nút
   * @default 300
   */
  showAfter?: number;

  /**
   * Vị trí của nút (góc màn hình)
   * @default 'bottom-right'
   */
  position?: "bottom-right" | "bottom-left" | "bottom-center";

  /**
   * CSS classes bổ sung
   */
  className?: string;
}

/**
 * Nút cuộn lên đầu trang sẽ hiện khi người dùng cuộn xuống
 */
const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  showAfter = 300,
  position = "bottom-right",
  className = "",
}) => {
  const { showButton, scrollToTop } = useScrollToTop({
    showAfter,
  });

  // Tạo classes cho vị trí
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "left-10 bottom-10";
      case "bottom-center":
        return "left-1/2 transform -translate-x-1/2 bottom-10";
      case "bottom-right":
      default:
        return "right-10 bottom-10";
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <button
      className={`fixed ${getPositionClasses()} p-3 rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 z-50 transform hover:scale-110 ${className}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollToTopButton;
