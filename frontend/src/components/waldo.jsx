import { useEffect, useState } from "react";
import waldoimg from "../assets/waldo.jpeg";

function Waldo() {
  // const [timer, updateTimer] = useState("");
  const [selected, setSelected] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [xNorm, setXNorm] = useState("");
  const [yNorm, setYNorm] = useState("");
  const [found, updateFound] = useState([]);
  const [wrong, setWrong] = useState("");
  const [won, setWon] = useState("");
  const allChars = ["Waldo", "Wilma", "Wizard"];

  useEffect(() => {
    const timer = setInterval(() => {
      setWrong(null);
    }, 15000);
    return () => clearTimeout(timer);
  }, [wrong]);

  useEffect(() => {
    function markFoundPerson() {
      const mainDiv = document.querySelector(".main");

      const markPerson = document.createElement("div");
      markPerson.classList.add("markedPerson");
      markPerson.style.left = `${x}px`;
      markPerson.style.top = `${y}px`;

      mainDiv.appendChild(markPerson);

      const allFound = allChars.every((char) => found.includes(char));
      if (allFound) {
        setWon("YOU FOUND THEM ALL :O");
      }
    }
    markFoundPerson();
  }, [found]);

  useEffect(() => {
    setWrong("");
    if (!selected) return;
    async function clickedPerson() {
      const res = await fetch("http://localhost:5555/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: xNorm,
          y: yNorm,
          person: selected,
        }),
      });
      const jsonres = await res.json();
      if (!res.ok) {
        return console.log("server err");
      } else {
        jsonres.message === false
          ? setWrong("big whomp")
          : updateFound((prev) => [...prev, jsonres.person]);
        const formDiv = document.querySelector(".form");
        formDiv.classList.add("hidden");
      }
    }
    clickedPerson();
  }, [selected]);

  async function handleClick(e) {
    e.preventDefault();

    const img = document.querySelector(".img");
    const imgBound = img.getBoundingClientRect();
    const xClick = e.clientX - imgBound.left;
    const yClick = e.clientY - imgBound.top;
    const xN = xClick / imgBound.width;
    const yN = yClick / imgBound.height;

    setX(xClick);
    setY(yClick);
    setXNorm(xN);
    setYNorm(yN);

    const clickDiv = document.querySelector(".click");
    const formDiv = document.querySelector(".form");

    clickDiv.style.left = `${xClick}px`;
    clickDiv.style.top = `${yClick}px`;

    const xPlus5 = xClick + 50;
    const yPlus5 = yClick + 10;

    formDiv.style.left = `${xPlus5}px`;
    formDiv.style.top = `${yPlus5}px`;

    clickDiv.classList.remove("hidden");
    formDiv.classList.remove("hidden");
  }

  return (
    <div className="main">
      {won ? <div>{won}</div> : null}
      {wrong ? <div>{wrong}</div> : null}
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
          <option value="Waldo">Waldo</option>
          <option value="Wilma">Wilma</option>
          <option value="Wizard">Wizard</option>
        </select>
      </form>
    </div>
  );
}

export default Waldo;
