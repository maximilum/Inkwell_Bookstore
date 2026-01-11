import "./App.css";
import { Outlet } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <div className="font-main">
        <Outlet />
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}

export default App;
