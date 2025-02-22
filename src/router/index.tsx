import ErrorLayout from "@layouts/ErrorLayout";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home";
import { createBrowserRouter } from "react-router-dom";

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
    ],
  },
]);
