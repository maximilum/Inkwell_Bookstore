import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import MyCart from "../pages/Cart/MyCart";
import Checkout from "../pages/Cart/Checkout";
import Book from "../pages/Books/Book";
import Orders from "../pages/Cart/Orders";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "../components/adminLogin";
import AddBook from "../pages/Admin Dashboard/AddBook";
import ManageBooks from "../pages/Admin Dashboard/ManageBooks";
import DashboardLayout from "../pages/Admin Dashboard/DashboardLayout";
import Dashboard from "../pages/Admin Dashboard/Dashboard";
import EditBook from "../pages/Admin Dashboard/EditBook";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <h1 className="mx-auto w-max text-center">About</h1>,
      },
      {
        path: "/Orders",
        element: (
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: <MyCart></MyCart>,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books/:id",
        element: <Book></Book>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "add-book",
        element: <AddBook />,
      },
    ],
  },
]);

export default router;
