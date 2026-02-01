import { useEffect, useState } from "react";

function Timer() {
  const [timer, updateTimer] = useState("");

  useEffect(() => {
    async function startTimer() {
      const res = await fetch("http://localhost:5555/");
      const data = await res.json();
      data ? "hi" : null;
    }
    startTimer();
  }, []);
}

export default Timer;
