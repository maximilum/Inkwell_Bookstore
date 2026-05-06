import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/Cart/Cart";
import MyCart from "../pages/Cart/MyCart";
import Checkout from "../pages/Cart/Checkout";
import Book from "../pages/Books/Book";
import Orders from "../pages/Cart/Orders";
import PrivateRoute from "./PrivateRoute";

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
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/books/:id",
        element: <Book></Book>,
      },
    ],
  },
]);

export default router;
