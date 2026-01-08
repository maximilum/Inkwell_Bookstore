import "./App.css";
import { Outlet } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import Navbar from "./components/Navbar";
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
        <div className="w-screen h-16 bg-black text-white">Footer</div>
      </footer>
    </>
  );
}

export default App;
