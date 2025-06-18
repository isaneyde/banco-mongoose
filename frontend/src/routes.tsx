import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Home, ErrorPage, Fila} from "./pages";
//import { MainLayout } from "./layout/layout";
import type { JSX } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,

  },
   {
    path: "/fila",
    element: <Fila />,

  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}