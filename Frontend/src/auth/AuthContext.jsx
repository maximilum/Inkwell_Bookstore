import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "./firebase.config.js";
import PlainLoading from "../components/LoadingScreen/Plain_Loading.jsx";
import { useNavigate } from "react-router-dom";
import { getUserId, initiateCart } from "../Redux/cartSlice.js";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

// auth hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// auth Provider component
// ===================================
const AuthProvider = ({ children }) => {
  // navigation
  const navigate = useNavigate();
  // Global states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // initiate cart load from local storage
  const dispatch = useDispatch();
  useEffect(() => {
    const uid = getUserId();
    dispatch(initiateCart(uid));
  }, [user]);

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
      navigate("/");
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
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  // SignOut
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("signed out successfully");
      setUser(null);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const value = { user, signUp, signIn, setUser, handleSignOut };
  if (loading) return <PlainLoading></PlainLoading>;

  return <AuthContext value={value}>{children}</AuthContext>;
};
export default AuthProvider;
