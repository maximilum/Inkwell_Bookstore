import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
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

// google provider
const provider = new GoogleAuthProvider();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Google sign in
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // const credential = GoogleAuthProvider.credentialFromError(error);
      alert(error.message);
      console.log(error.message);
    }
  };

  // signup
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      alert("user registered successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };
  // SignIn
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredentials.user);
      alert("sign in successfull");
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
      console.log(error);
    }
  };
  // SignOut
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      alert("signed out successfully");
      setUser(null);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const currentUser = auth.currentUser;
  const value = {
    currentUser,
    user,
    signUp,
    signIn,
    setUser,
    handleSignOut,
    signInWithGoogle,
  };
  if (loading) return <PlainLoading></PlainLoading>;

  return <AuthContext value={value}>{children}</AuthContext>;
};
export default AuthProvider;
