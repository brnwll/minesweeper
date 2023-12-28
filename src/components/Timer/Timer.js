import React, { useState, useEffect } from "react";
import { NOT_STARTED, PLAYING, WON, LOST } from "../../helpers/Constants";
import "./Timer.css";

const Timer = ({ gameStatus }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let clock;
    if (gameStatus === NOT_STARTED) setTimer(0);
    if (gameStatus === LOST || gameStatus === WON) clearInterval(clock);
    if (gameStatus === PLAYING) {
      clock = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(clock);
  }, [gameStatus]);

  return <div id="Timer">{timer}</div>;
};

export default Timer;
