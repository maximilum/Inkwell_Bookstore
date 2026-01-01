import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <h1 className="mx-auto w-max text-center">About</h1>,
      },
      {
        path: "/",
        element: <h1>My Bookstore</h1>,
      },
    ],
  },
]);

export default router;
