import { useState } from "react";
import { Outlet } from "react-router-dom";
import Waldo from "./components/waldo";
import "./assets/css.css";

function App() {
  return (
    <div className="main">
      <Outlet>
        <Waldo />
      </Outlet>
    </div>
  );
}

export default App;
