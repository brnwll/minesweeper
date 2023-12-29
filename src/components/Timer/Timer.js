import React, { useState, useEffect } from "react";
import { NOT_STARTED, PLAYING, WON, LOST } from "../../helpers/Constants";
import "./Timer.css";

const Timer = ({ gameState }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let clock;
    if (gameState === NOT_STARTED) setTimer(0);
    if (gameState === LOST || gameState === WON) clearInterval(clock);
    if (gameState === PLAYING) {
      clock = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(clock);
  }, [gameState]);

  return <div id="Timer">{timer}</div>;
};

export default Timer;
