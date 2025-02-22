import { createBrowserRouter } from "react-router-dom";
import {
  Contact,
  ErrorLayout,
  Home,
  MainLayout,
} from "@components/loadableComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);
