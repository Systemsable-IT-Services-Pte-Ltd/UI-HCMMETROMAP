import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { metroStations } from "@data/metroLines";
import type { WPPage } from "@services/api/WordPressService";
import WordPressService from "@services/api/WordPressService";
import StationInfo from "@pages/StationDetail/Station/StationInfo";
import StationMap from "@pages/StationDetail/Station/StationMap";
import StationFeatures from "@pages/StationDetail/Station/StationFeatures";
import LoadingSpinner from "@components/LoadingSpinner";
import { useTranslation } from "@hooks/useTranslation";
import { FaArrowLeft } from "react-icons/fa";

const StationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stationDetails, setStationDetails] = useState<WPPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const station = Object.values(metroStations).find((s) => s.slug === slug);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getErrorMessage = useCallback(() => t("errorLoadingStation"), []);

  useEffect(() => {
    const fetchStationDetails = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const stationData = await WordPressService.getPage(slug);
        setStationDetails(stationData);
        setError(null);
      } catch (err) {
        console.error(`Error fetching station details for ${slug}:`, err);
        setError(getErrorMessage());
        setStationDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStationDetails();
  }, [slug, getErrorMessage]);

  if (!station) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-red-700">
            {t("stationNotFound")}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md"
          >
            <FaArrowLeft className="mr-2" /> {t("back")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md"
      >
        <FaArrowLeft className="mr-1 text-xs" /> {t("back")}
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner color="purple-500" />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-700">{error}</div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {station?.name.en}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StationInfo
                  station={station!}
                  stationDetails={stationDetails}
                />
                <StationMap
                  station={station!}
                  stationDetails={stationDetails}
                />
              </div>

              <div>
                <StationFeatures station={station!} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StationDetailPage;
