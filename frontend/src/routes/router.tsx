import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/templates/AppLayout/AppLayout";
import { Home } from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);
