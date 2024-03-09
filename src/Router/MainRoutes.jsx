import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Channel from "../Pages/Channel/Channel";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";
import Home from "../Pages/SitePages/Home";
import ChannelDashboard from "../Pages/ChannelDashboard/ChannelDashboard";
import ErrorPage from "../Pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/contact",
        element: <h1>Contact</h1>,
      },
    ],
  },
  {
    path: "/channel/:id",
    element: <Channel />,
  },
  {
    path: "/user",
    element: <UserDashboard />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <ChannelDashboard />,
    children: [],
  },
]);

const MainRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MainRoutes;
