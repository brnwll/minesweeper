import { useState } from "react";
import * as MS from "../helpers/Minesweeper";

const useBoard = ({ rows, cols, bombs }) => {
  const [board, setBoard] = useState(MS.initializeBoard(rows, cols, bombs));

  const resetBoard = ({ rows, cols, bombs }) => {
    setBoard(MS.initializeBoard(rows, cols, bombs));
  };

  return [board, resetBoard];
};

export default useBoard;
