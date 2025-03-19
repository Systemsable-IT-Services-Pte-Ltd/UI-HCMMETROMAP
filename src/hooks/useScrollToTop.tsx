import { useState, useEffect, useCallback } from "react";

interface ScrollToTopOptions {
  /**
   * Khoảng cách scroll (px) trước khi hiển thị nút
   * @default 300
   */
  showAfter?: number;

  /**
   * Thời gian (ms) để trễ trước khi cập nhật trạng thái
   * giúp tối ưu hiệu suất
   * @default 100
   */
  delay?: number;

  /**
   * Tốc độ cuộn (ms) khi nhấp vào nút
   * @default 500
   */
  scrollDuration?: number;
}

/**
 * Custom hook để theo dõi vị trí cuộn và hiển thị/ẩn nút quay lại đầu trang
 */
export const useScrollToTop = ({
  showAfter = 300,
  delay = 100,
  scrollDuration = 500,
}: ScrollToTopOptions = {}) => {
  // Trạng thái hiển thị nút
  const [showButton, setShowButton] = useState(false);

  // Xử lý sự kiện scroll theo dõi vị trí
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldShow = scrollTop > showAfter;

    if (shouldShow !== showButton) {
      setShowButton(shouldShow);
    }
  }, [showAfter, showButton]);

  // Thêm tham số để theo dõi cuộn trang
  useEffect(() => {
    // Thêm debounce để tối ưu hiệu suất
    let timeoutId: NodeJS.Timeout | null = null;

    const debouncedHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleScroll();
      }, delay);
    };

    // Đăng ký sự kiện scroll
    window.addEventListener("scroll", debouncedHandleScroll);

    // Kiểm tra vị trí cuộn ban đầu
    handleScroll();

    // Hủy đăng ký khi component unmount
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll, delay]);

  // Hàm để cuộn lên đầu trang mượt mà
  const scrollToTop = useCallback(() => {
    const scrollStep = -window.scrollY / (scrollDuration / 10);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);

    return () => clearInterval(scrollInterval);
  }, [scrollDuration]);

  // Cung cấp thông tin chi tiết về scroll để tùy chỉnh nâng cao
  const scrollInfo = {
    scrollTop:
      typeof document !== "undefined"
        ? window.pageYOffset || document.documentElement.scrollTop
        : 0,
    scrollHeight:
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight
        : 0,
    clientHeight:
      typeof document !== "undefined"
        ? document.documentElement.clientHeight
        : 0,
    // % đã cuộn
    scrollPercentage:
      typeof document !== "undefined"
        ? ((window.pageYOffset || document.documentElement.scrollTop) /
            (document.documentElement.scrollHeight -
              document.documentElement.clientHeight)) *
          100
        : 0,
  };

  return {
    showButton,
    scrollToTop,
    scrollInfo,
  };
};
