import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Waldo from "./components/waldo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <Waldo /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
);
