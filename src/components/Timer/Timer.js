import React, { useState, useEffect } from "react";
import * as Constant from "../Helpers/Constants";
import "./Timer.css";

const Timer = ({ gameState }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameState === Constant.NOT_STARTED) {
      setTimer(0);
      return;
    }
    if (gameState === Constant.PLAYING) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  return <div id="Timer">{timer}</div>;
};

export default Timer;
