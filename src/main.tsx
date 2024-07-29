import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardRout from "@components/cards/CardRouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Error dude!</div>,
    errorElement: <App />,
  },
  {
    path: "/add_info/:movieId",
    element: <CardRout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
