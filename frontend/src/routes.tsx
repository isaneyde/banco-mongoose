import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
import { Home, ErrorPage, Login, BankAccount, BankServices, Fila} from "./pages";
=======
import { Home, ErrorPage, Login, BankAccount, BankServices, Fila } from "./pages";
import { MainLayout } from "./layouts/layout";
>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
=======
import {
  Home,
  ErrorPage,
  Login,
  BankAccount,
  BankServices,
  Fila,
} from "./pages";
>>>>>>> 7733d381e66930a4ce211e1e78762fb9eedb18c9
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

<<<<<<< HEAD
<<<<<<< HEAD
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

   }
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}

=======
  export function Routes() {
    return <RouterProvider router={router} />;
  }
>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
=======
export function Routes() {
  return <RouterProvider router={router} />;
}
>>>>>>> 7733d381e66930a4ce211e1e78762fb9eedb18c9
