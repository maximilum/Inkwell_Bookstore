import "./App.css";
import { Outlet } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./authentication/Auth";
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
        <footer>
          <Footer></Footer>
        </footer>
      </AuthProvider>
    </>
  );
}

export default App;
