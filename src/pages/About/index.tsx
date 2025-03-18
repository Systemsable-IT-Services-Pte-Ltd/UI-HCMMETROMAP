import hcmcBackground from "@assets/images/background/hcmcmetro-background.jpg";
import { useTranslation } from "@hooks/useTranslation";
import { FaBuilding, FaCity, FaClock, FaRoad, FaTrain } from "react-icons/fa";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${hcmcBackground})`,
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-4 sm:px-6 md:px-8 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {t("aboutTitle")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            {t("aboutDescription")}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 -mt-8 relative z-10">
        {/* Project Overview */}
        <section className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3 sm:mb-4">
            {t("projectOverview")}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6">
            {t("projectOverviewText")}
          </p>
        </section>

        {/* Line 1 Overview */}
        <section className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3 sm:mb-4">
            {t("line1Overview")}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6">
            {t("line1OverviewText")}
          </p>

          {/* Key Features */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4">
              {t("keyFeatures")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg">
                <FaBuilding className="text-purple-600 text-xl sm:text-2xl mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {t("stations14")}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg">
                <FaRoad className="text-purple-600 text-xl sm:text-2xl mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">{t("elevated")}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg">
                <FaTrain className="text-purple-600 text-xl sm:text-2xl mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {t("underground")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline and Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-4 flex items-center">
              <FaClock className="mr-3 text-purple-600 flex-shrink-0" />
              {t("timeline")}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-700 text-base sm:text-lg">
                  {t("startDate")}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-700 text-base sm:text-lg">
                  {t("completionDate")}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-4 flex items-center">
              <FaCity className="mr-3 text-purple-600 flex-shrink-0" />
              {t("impact")}
            </h2>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-700 text-base sm:text-lg">
                {t("impactText")}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
