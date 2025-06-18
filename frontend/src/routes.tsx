import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Home,
  ErrorPage,
  Login,
  BankAccount,
  BankServices,
  Fila,
} from "./pages";
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
    element: <Home />,
    errorElement: <ErrorPage />,
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
    element: (
      <RequireAuth>
        <BankServices />
      </RequireAuth>
    ),
  },
  {
    path: "/fila",
    element: (
      <RequireAuth>
        <Fila />
      </RequireAuth>
    ),
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
