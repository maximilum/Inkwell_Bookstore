import { Navigate, Outlet } from "react-router-dom";

const AdminRouter = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin" replace></Navigate>;
  }
  return children ? children : <Outlet></Outlet>;
};

export default AdminRouter;
