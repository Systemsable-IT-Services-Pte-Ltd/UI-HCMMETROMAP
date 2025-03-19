import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import WordPressService, { WPPage } from "@services/api/WordPressService";
import { PostContext } from "./PostcontextValue";

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  // State để lưu trữ bài viết hiện tại
  const [currentPost, setCurrentPost] = useState<WPPage | null>(null);
  const [posts, setPosts] = useState<WPPage[]>([]);
  useEffect(() => {
    // Hàm để lấy các bài viết từ API
    const fetchPosts = async () => {
      try {
        const response = await WordPressService.getPosts();
        if (response) {
          setPosts(response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  // State để lưu trữ danh sách bài viết
  const handleSetCurrentPost = useCallback((post: WPPage | null) => {
    setCurrentPost(post);
  }, []);
  const contextValue = useMemo(
    () => ({
      currentPost,
      posts,
      setPosts,
      handleSetCurrentPost,
    }),
    [currentPost, posts, setPosts, handleSetCurrentPost]
  );

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};
