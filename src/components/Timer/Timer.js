import React, { useState, useEffect } from "react";
import { NOT_STARTED, PLAYING, WON, LOST } from "../../helpers/Constants";
import "./Timer.css";

const Timer = ({ gameState }) => {
  const [timer, setTimer] = useState(0);

  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Pad the seconds with a leading zero if less than 10
    remainingSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return minutes + ":" + remainingSeconds;
  }

  useEffect(() => {
    let clock;
    if (gameState === NOT_STARTED) setTimer(0);
    if (gameState === LOST || gameState === WON) clearInterval(clock);
    if (gameState === PLAYING) {
      clock = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(clock);
  }, [gameState]);

  return (
    <div id="Timer">
      {gameState === PLAYING && <div class="hand"></div>}
      <div class="number">{formatTime(timer)}</div>
    </div>
  );
};

export default Timer;
