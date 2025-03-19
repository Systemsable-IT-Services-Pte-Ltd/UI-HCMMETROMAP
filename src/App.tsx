import { router } from "@router/index";
import { RouterProvider } from "react-router-dom";
import { TranslationProvider } from "./contexts/TranslationContext";
import { PostProvider } from "@contexts/PostContext";

const App = () => {
  return (
    <TranslationProvider>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </TranslationProvider>
  );
};

export default App;
