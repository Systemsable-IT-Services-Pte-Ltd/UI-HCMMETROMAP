import ErrorLayout from "@layouts/ErrorLayout";
import MainLayout from "@layouts/MainLayout";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Home from "@pages/Home";
import Lines from "@pages/Lines";
import PostDetailPage from "@pages/Post/PostDetailPage";
import StationDetailPage from "@pages/StationDetail";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <>
        <ScrollRestoration />
        <MainLayout />
      </>
    ),
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
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
      {
        path: "/station/:slug",
        element: <StationDetailPage />,
      },
      {
        path: "/post/:slug",
        element: <PostDetailPage />,
      },
    ],
  },
]);
