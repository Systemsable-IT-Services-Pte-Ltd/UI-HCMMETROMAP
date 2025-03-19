import SkeletonLoader from "@components/SkeletonLoader";
import { usePost } from "@hooks/usePost";
import { useTranslation } from "@hooks/useTranslation";
import type { WPPage } from "@services/api/WordPressService";
import WordPressService from "@services/api/WordPressService";
import parse from "html-react-parser";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { state } = useLocation();
  const [post, setPost] = useState<WPPage | null>(state?.post || null);
  const { posts } = usePost();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      if (post && post?.slug === slug) {
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 400);
        return () => clearTimeout(timeoutId);
      }
      try {
        setLoading(true);
        const fetchedPost = post
          ? post
          : await WordPressService.getPostBySlug(slug);
        setPost(fetchedPost);
        if (fetchedPost?.title?.rendered) {
          document.title = `${parse(fetchedPost.title.rendered)} - Metro Map`;
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  useEffect(() => {
    if (state?.post) {
      setLoading(true);
      setPost(state.post);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [state?.post]);
  const handleNavigate = useCallback(
    (post: WPPage) => {
      navigate(`/post/${post?.slug}`, { state: { post }, replace: true });
    },
    [navigate]
  );
  // Custom renderer for the post content with improved styling
  const renderContent = () => {
    if (!post?.content?.rendered) return null;
    const styledContent = post?.content?.rendered
      .replace(/<h1/g, '<h1 class="text-3xl font-bold mb-4 mt-6"')
      .replace(/<h2/g, '<h2 class="text-2xl font-bold mb-3 mt-5"')
      .replace(/<h3/g, '<h3 class="text-xl font-bold mb-2 mt-4"')
      .replace(/<p>/g, '<p class="mb-4 leading-relaxed">')
      .replace(/<ul>/g, '<ul class="list-disc pl-5 mb-4 space-y-1">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-5 mb-4 space-y-1">')
      .replace(/<li>/g, '<li class="mb-1">')
      .replace(
        /<blockquote>/g,
        '<blockquote class="border-l-4 border-purple-500 pl-4 italic my-4">'
      );
    return parse(styledContent);
  };

  // Get related posts from the posts array
  const relatedPosts = useMemo(() => {
    if (!post || !posts || posts.length === 0) return [];
    return posts.filter((p) => p.id !== post.id).slice(0, 3);
  }, [post, posts]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <SkeletonLoader type="post-detail" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <p className="text-red-600">{t("errorLoadingPost")}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500">{t("postNotFound")}</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
        <h1 className="text-4xl font-bold mb-4">
          {parse(post?.title?.rendered || "")}
        </h1>
      </div>
      <div className="prose prose-lg max-w-none">{renderContent()}</div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-6">{t("relatedPosts")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.id}
                onClick={() => handleNavigate(relatedPost)}
                className="group block"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  {relatedPost?.jetpack_featured_media_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedPost?.jetpack_featured_media_url}
                        alt={relatedPost?.title?.rendered || ""}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {parse(relatedPost?.title?.rendered || "")}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">
                        {new Date(relatedPost?.date).toLocaleDateString()}
                      </p>
                      <span className="text-purple-600 text-sm font-medium group-hover:underline">
                        {t("readMore")}
                      </span>
                    </div>
                    {relatedPost?.excerpt?.rendered && (
                      <div className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {parse(relatedPost?.excerpt?.rendered)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
