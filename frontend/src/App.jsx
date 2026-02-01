import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import Timer from "../components/Timer";
import Waldo from "./components/waldo";

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
