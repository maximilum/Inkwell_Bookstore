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
      <div className="font-main text-primary">
        <Outlet />
      </div>
      <div className="font-main text-secondary">Footer</div>
    </>
  );
}

export default App;
