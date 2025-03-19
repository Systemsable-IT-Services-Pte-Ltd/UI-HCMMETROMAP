import { PostContext } from "@contexts/PostcontextValue";
import { useContext } from "react";

/**
 * Hook để sử dụng PostContext trong các component
 */
export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }

  return context;
};
