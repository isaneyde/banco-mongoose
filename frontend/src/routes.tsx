import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Home, ErrorPage, Login, BankAccount, BankServices, Fila,CalendarioAtendimento,Sucesso} from "./pages";
import type { JSX } from "react";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/bankAccount",
        element: <BankAccount />,
      },
      {
        path: "/bankServices",
        element: <BankServices />,
      },
      {
    path: "/fila",
    element: <Fila />,

   },
    {
    path: "/calendarAtendimento",
    element: <CalendarioAtendimento />,

   },{
    path: "/sucesso",
    element: <Sucesso />,

   }
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}


