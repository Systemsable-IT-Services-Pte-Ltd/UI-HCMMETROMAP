import { RouterProvider } from "react-router-dom";
import { router } from "@router/index";
import { TranslationProvider } from "./contexts/TranslationContext";

const App = () => {
  return (
    <TranslationProvider>
      <RouterProvider router={router} />
    </TranslationProvider>
  );
};

export default App;
