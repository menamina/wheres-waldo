import { useEffect, useState } from "react";

function Timer(start, setStart, end, setEnd) {
  useEffect(() => {
    async function startTimer() {
      try {
        const res = await fetch("http://localhost:5555/start");
        const data = await res.json();
        if (!res.ok) {
          return console.log("res not okay");
        } else {
          data.starTime === 0 ? setStart(0) : null;
        }
      } catch (error) {
        console.log("error!!!!", error.message);
      }
    }
    startTimer();
  }, []);

  return (
    <div className="timerDiv">
      <div>{start}</div>
    </div>
  );
}

export default Timer;
