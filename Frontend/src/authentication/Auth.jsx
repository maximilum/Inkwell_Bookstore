import { createContext, useContext } from "react";

const authContext = createContext();
export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
  const value = {};
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
