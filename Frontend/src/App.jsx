import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>Navbar</div>
      <div className="">
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  );
}

export default App;
