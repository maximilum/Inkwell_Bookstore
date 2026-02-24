import { createContext, useContext } from "react";

const AuthContext = createContext();

// auth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// auth Provider component
const AuthProvider = ({ children }) => {
  const value = { name: "hello context" };
  return <AuthContext value={value}>{children}</AuthContext>;
};
export default AuthProvider;
