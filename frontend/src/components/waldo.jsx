import { useEffect, useState } from "react";
import waldoimg from "../assets/waldo.jpeg";

function Waldo() {
  const [timer, updateTimer] = useState("");
  const [found, updateFound] = useState("");

  // useEffect(() => {
  //   async function startTimer() {
  //     const res = await fetch("http://localhost:5555/");
  //     const data = await res.json();
  //     data ? "hi" : null;
  //   }
  //   startTimer();
  // }, []);

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="">
      <img src={waldoimg} alt="where's waldo image" onClick={handleClick}></img>
    </div>
  );
}

export default Waldo;
