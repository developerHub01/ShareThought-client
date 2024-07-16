import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../components/layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import AuthPage from "../pages/AuthPage";
import ChannelLayout from "../components/layouts/ChannelLayout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "channel/:id",
        element: <ChannelLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "category",
            element: <Home />,
          },
          {
            path: "about",
            element: <Home />,
          },
          {
            path: "search",
            element: <Home />,
          },
        ],
      },
      {
        path: "read-later",
        element: <Home />,
      },
      {
        path: "saved-category",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Home />,
      },
      {
        path: "my-channels",
        element: <Home />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthPage />,
  },
]);

const MainRoute = () => <RouterProvider router={router} />;

export default MainRoute;
