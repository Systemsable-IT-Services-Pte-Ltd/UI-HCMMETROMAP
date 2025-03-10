import { createBrowserRouter } from "react-router-dom";
import { Contact, About } from "@components/loadableComponent";
import MainLayout from "@layouts/MainLayout";
import ErrorLayout from "@layouts/ErrorLayout";
import Home from "@pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: "/maps",
        element: <Home />,
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