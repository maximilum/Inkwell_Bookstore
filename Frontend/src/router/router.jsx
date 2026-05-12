import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import { OrbitProgress } from "react-loading-indicators";
// Lazy imports
const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));
const MyCart = lazy(() => import("../pages/Cart/MyCart"));
const Checkout = lazy(() => import("../pages/Cart/Checkout"));
const Book = lazy(() => import("../pages/Books/Book"));
const Orders = lazy(() => import("../pages/Cart/Orders"));
const AdminLogin = lazy(() => import("../components/adminLogin"));
const AddBook = lazy(() => import("../pages/Admin Dashboard/AddBook"));
const ManageBooks = lazy(() => import("../pages/Admin Dashboard/ManageBooks"));
const DashboardLayout = lazy(
  () => import("../pages/Admin Dashboard/DashboardLayout"),
);
const Dashboard = lazy(() => import("../pages/Admin Dashboard/Dashboard"));
const EditBook = lazy(() => import("../pages/Admin Dashboard/EditBook"));
const Discover = lazy(() => import("../pages/Discover/Discover"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <OrbitProgress color="#ffd700" size="large" text="" textColor="" />
          </div>
        }
      >
        <App />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/about",
        element: <h1 className="mx-auto w-max text-center">About</h1>,
      },
      {
        path: "/Orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      { path: "/cart", element: <MyCart /> },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/books/:id", element: <Book /> },
      { path: "/discover", element: <Discover /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <OrbitProgress color="#ffd700" size="large" text="" textColor="" />
          </div>
        }
      >
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <OrbitProgress color="#ffd700" size="large" text="" textColor="" />
          </div>
        }
      >
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      </Suspense>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "manage-books", element: <ManageBooks /> },
      { path: "edit-book/:id", element: <EditBook /> },
      { path: "add-book", element: <AddBook /> },
    ],
  },
]);

export default router;
