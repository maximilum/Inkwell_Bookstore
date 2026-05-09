import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./auth/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <header>
          <Navbar></Navbar>
        </header>
        <div className="font-main">
          <Outlet />
        </div>
        <ScrollRestoration />
        <footer>
          <Footer></Footer>
        </footer>
      </AuthProvider>
    </>
  );
}

export default App;
