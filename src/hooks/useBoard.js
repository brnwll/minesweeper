import { useState } from "react";
import * as MS from "../helpers/Minesweeper";

const useBoard = ({ rows, cols, bombs }) => {
  const [board, setBoard] = useState(MS.initializeBoard(rows, cols, bombs));

  return [board, setBoard];
};

export default useBoard;
