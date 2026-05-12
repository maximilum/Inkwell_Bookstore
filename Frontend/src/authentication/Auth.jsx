import { createContext, useContext, useEffect, useState } from "react";
import auth from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PlainLoading from "../components/loading/Plain_Loading.jsx";
import { useDispatch } from "react-redux";
import { clearShelf, restoreShelf } from "../Redux/shelfSlice.js";

// const provider = new GoogleAuthProvider();

// Context
const authContext = createContext();
export const useAuth = () => {
  return useContext(authContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  // auto navigation
  const navigate = useNavigate();

  // state hooks
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Auth Observer side effect
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      console.log("observer initiate");
    });
    return unsubscribe;
  }, []);

  // clear shelf when signOut
  useEffect(() => {
    if (!user) {
      dispatch(clearShelf());
    } else dispatch(restoreShelf());
  }, [user]);

  // define signUp function
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      setUser(user);
      alert("user signed up successfully");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      setUser(user);
      console.log("logged in successfully");
      dispatch(restoreShelf());
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearShelf());
      // setUser(null);
      console.log("signed out successfully");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const value = { signUp, signIn, handleSignOut, user, setUser, isLoading };
  if (isLoading) {
    return <PlainLoading></PlainLoading>;
  }
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
