import { useEffect, useState } from "react";
import waldoimg from "../assets/waldo.jpeg";

function Waldo() {
  const [timer, updateTimer] = useState("");
  const [found, updateFound] = useState([]);
  const [wrong, setWrong] = useState("");

  // useEffect(() => {
  //   async function startTimer() {
  //     const res = await fetch("http://localhost:5555/");
  //     const data = await res.json();
  //     data ? "hi" : null;
  //   }
  //   startTimer();
  // }, []);

  async function handleClick(e) {
    e.preventDefault();

    const img = document.querySelector(".img");
    const rect = img.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickDiv = document.querySelector(".click");

    clickDiv.style.left = `${x}px`;
    clickDiv.style.right = `${y}px`;

    clickDiv.classList.remove("hidden");

    const xNorm = x / rect.width;
    const yNorm = y / rect.height;

    const fetch = await fetch("http://localhost:5555/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x: xNorm,
        y: yNorm,
        person: selected
      })

    });
    const jsonres = await fetch.json();
    if (!jsonres) {
      return console.log("whoops")
    } jsonres.message === "wrong" ? setWrong("WHOMP WHOMP INCORRECT") : 



  }

  return (
    <div className="main">
      <img
        className="img"
        src={waldoimg}
        alt="where's waldo image"
        onClick={handleClick}
      ></img>
      <div className="click hidden"></div>
      <form>
        <select name="person">
          <option value="waldo">Waldo</option>
          <option value="wilma">Waldo</option>
          <option value="wizard">Waldo</option>

        </select>
      </form>
    </div>
  );
}

export default Waldo;
