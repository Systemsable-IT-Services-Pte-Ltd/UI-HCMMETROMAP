import ErrorLayout from "@layouts/ErrorLayout";
import MainLayout from "@layouts/MainLayout";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Home from "@pages/Home";
import Lines from "@pages/Lines";
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
      {
        path: "/Lines",
        element: <Lines />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
