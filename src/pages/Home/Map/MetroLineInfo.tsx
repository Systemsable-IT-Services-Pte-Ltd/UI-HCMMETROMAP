import React, { useCallback, useEffect, useState } from "react";
import WordPressService from "@services/api/WordPressService";
import { useTranslation } from "@hooks/useTranslation";

const MetroLineInfo: React.FC = () => {
  const { t } = useTranslation();
  const [metroLineInfo, setMetroLineInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  const fetchMetroLineInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const line1Data = await WordPressService.getMetroLine("line-1");
      if (line1Data && line1Data.content && line1Data.content.rendered) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = line1Data.content.rendered;
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        setMetroLineInfo(textContent.substring(0, 300) + "...");
        setRetryCount(0); // Reset retry count on success
      } else {
        setMetroLineInfo(
          "Information about Line 1 (Ben Thanh - Suoi Tien) will be available soon."
        );
      }
    } catch (err) {
      console.error("Error fetching metro line info:", err);
      // Retry logic
      if (retryCount < MAX_RETRIES) {
        setRetryCount((prev) => prev + 1);
        setTimeout(() => fetchMetroLineInfo(), 1000 * (retryCount + 1));
      } else {
        setError("Could not load metro line information.");
        setMetroLineInfo(null);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount, MAX_RETRIES]);

  useEffect(() => {
    fetchMetroLineInfo();
  }, [fetchMetroLineInfo]);

  // Handle retry button click
  const handleRetry = () => {
    setRetryCount(0);
    fetchMetroLineInfo();
  };

  if (loading) {
    return (
      <div className="mt-4 p-3 bg-purple-50 rounded-md flex justify-center">
        <div className="animate-pulse h-4 bg-purple-200 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-100">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={handleRetry}
          className="text-red-600 text-xs mt-2 hover:underline"
        >
          {t("tryAgain")}
        </button>
      </div>
    );
  }

  if (metroLineInfo) {
    return (
      <div className="mt-4 p-3 bg-purple-50 rounded-md text-sm text-gray-700 border border-purple-100">
        <h3 className="font-bold text-purple-700 mb-1">{t("aboutLine1")}</h3>
        <p>{metroLineInfo}</p>
        <button
          onClick={() =>
            window.open("https://hochiminhcitymetro.com/line-1/", "_blank")
          }
          className="text-purple-600 text-xs mt-2 hover:underline"
        >
          {t("readMore")}
        </button>
      </div>
    );
  }

  return null;
};

export default MetroLineInfo;
