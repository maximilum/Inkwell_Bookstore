import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="font-main font-bold text-Favorite">Navbar</div>
      <div className="font-main text-primary">
        <Outlet />
      </div>
      <div className="font-main text-secondary">Footer</div>
    </>
  );
}

export default App;
