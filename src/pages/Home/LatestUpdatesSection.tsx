/* eslint-disable react-hooks/exhaustive-deps */
import SkeletonLoader from "@components/SkeletonLoader";
import { useTranslation } from "@hooks/useTranslation";
import type { WPPage } from "@services/api/WordPressService";
import WordPressService from "@services/api/WordPressService";
import parse from "html-react-parser";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

interface UpdateCardProps {
  post: WPPage;
  onClick: (path: string) => void;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ post, onClick }) => {
  const { t, language } = useTranslation();
  const formattedDate = new Date(post?.date).toLocaleDateString();

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
      onClick={() => onClick(`/post/${post?.slug}`)}
    >
      <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
      <h3 className="text-xl font-bold mb-2">
        {parse(post?.title?.rendered || "")}
      </h3>
      <div className="text-gray-600">
        {parse(post?.excerpt?.rendered || "")}
      </div>
      <div className="mt-4 flex items-center text-purple-600 hover:text-purple-800 font-medium space-x-1 md:space-x-0 md:group-hover:space-x-1 transition-all duration-300 ease-in-out cursor-pointer">
        <span className="whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 ease-in-out">
          {t("readMore")}
        </span>
        <FaArrowRight
          className={
            language === "en"
              ? "text-xs md:transform md:translate-x-[-79.15px] md:group-hover:translate-x-0 transition-all duration-300 ease-in-out"
              : "text-xs md:transform md:translate-x-[-68.47px] md:group-hover:translate-x-0 transition-all duration-300 ease-in-out"
          }
        />
      </div>
    </div>
  );
};

const LatestUpdatesSection: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<WPPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getErrorMessage = useCallback(() => t("errorLoadingUpdates"), []);
  const navigate = useNavigate();
  const handlePostClick = useCallback(
    (post: WPPage) => {
      if (post?.slug) {
        navigate(`/post/${post.slug}`, { state: { post } });
      }
    },
    [navigate]
  );

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const latestPosts = await WordPressService.getLatestUpdates(2);
        setPosts(latestPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching updates:", err);
        setError(getErrorMessage());
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, [getErrorMessage]);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">{t("latestUpdates")}</h2>
          {!loading && posts.length > 0 && (
            <div
              onClick={() => navigate("/updates")}
              className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
            >
              {t("viewAllUpdates")}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonLoader type="post" />
            <SkeletonLoader type="post" />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-500">{t("noUpdatesAvailable")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <UpdateCard
                key={post?.id}
                post={post}
                onClick={() => handlePostClick(post)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestUpdatesSection;
