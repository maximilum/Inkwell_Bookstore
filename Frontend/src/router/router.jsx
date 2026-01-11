import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";

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
        element: <h1 className="mx-auto w-max text-center">Orders</h1>,
      },
      {
        path: "/cart",
        element: <h1 className="mx-auto w-max text-center">Cart</h1>,
      },
      {
        path: "/checkout",
        element: <h1 className="mx-auto w-max text-center">Checkout</h1>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
