import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Delete from "../Pages/Delete";
import EventUploader from "../Pages/Home/Home/EventUploader";
import BlogUpload from "../Pages/Home/Home/BlogUpload";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />, // Main layout
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />, // Home Page
      },
      {
        path: "/blogs",
        element: <BlogUpload />, // Home Page
      },
      {
        path: "/events",
        element: <EventUploader />, // Home Page
      },
      {
        path: "/delete",
        element: <Delete />, // Home Page
      },
    ],
  },
]);
