import { useEffect, useState } from "react";
import waldoimg from "../assets/waldo.jpeg";

function Waldo() {
  const [timer, updateTimer] = useState("");
  const [selected, setSelected] = useState(null);
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
    const imgBound = img.current.getBoundingClientRect();
    const x = e.clientX - imgBound.left;
    const y = e.clientY - imgBound.top;

    const clickDiv = document.querySelector(".click");
    const formDiv = document.querySelector(".form");

    clickDiv.style.left = `${x}px`;
    clickDiv.style.right = `${y}px`;

    clickDiv.classList.remove("hidden");
    formDiv.classList.remove("hidden");

    const xNorm = x / imgBound.width;
    const yNorm = y / imgBound.height;

    const fetch = await fetch("http://localhost:5555/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x: xNorm,
        y: yNorm,
        person: selected,
      }),
    });
    const jsonres = await fetch.json();
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
      <form className="form">
        <select
          name="person"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="waldo">Waldo</option>
          <option value="wilma">Waldo</option>
          <option value="wizard">Waldo</option>
        </select>
      </form>
    </div>
  );
}

export default Waldo;
