import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaadceV0bHxM71Aq9AYMMlHfkC3z_Oamk",
  authDomain: "book-store-c1e60.firebaseapp.com",
  projectId: "book-store-c1e60",
  storageBucket: "book-store-c1e60.firebasestorage.app",
  messagingSenderId: "178475895478",
  appId: "1:178475895478:web:561260d3fb5e54e2533417",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
