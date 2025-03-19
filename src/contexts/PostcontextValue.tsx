import { createContext } from "react";
import { WPPage } from "@services/api/WordPressService";

interface PostContextType {
  currentPost: WPPage | null;
  posts: WPPage[];
  setPosts: (posts: WPPage[]) => void;
  handleSetCurrentPost: (post: WPPage | null) => void;
}

export const PostContext = createContext<PostContextType>({
  currentPost: null,
  posts: [],
  setPosts: () => {},
  handleSetCurrentPost: () => {},
});
