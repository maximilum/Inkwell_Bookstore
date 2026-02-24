import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "./firebase.config.js";

const AuthContext = createContext();

// auth hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// auth Provider component
const AuthProvider = ({ children }) => {
  // Global states
  const [user, setUser] = useState(null);

  // signup
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      alert("user registered successfully");
    } catch (error) {
      alert(error.message);
    }
  };
  // SignIn
  const signIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredentials.user);
      alert("sign in successfull");
    } catch (error) {
      alert(error.message);
    }
  };

  const value = { signUp, signIn, user };
  return <AuthContext value={value}>{children}</AuthContext>;
};
export default AuthProvider;
