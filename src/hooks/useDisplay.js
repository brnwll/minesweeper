import { useState } from "react";
import * as MS from "../helpers/Minesweeper";
import { BOMB, FLAG, EMPTY, UNSELECTED } from "../helpers/Constants";

const useDisplay = ({ rows, cols }) => {
  const [display, setDisplay] = useState(() => MS.getBoardOf(rows, cols, ""));

  const updateCell = (r, c, val) => {
    const updatedDisplay = [...display];
    updatedDisplay[r][c] = val;
    setDisplay(updatedDisplay);
  };

  const toggleFlag = (r, c, board, bombsRemaining, setBombsRemaining) => {
    const flagged = display[r][c] === FLAG;
    // prevent adding more flags than bombs, always allow removing flags
    if (bombsRemaining === 0 && !flagged) return;
    let newDisplay = [...display];
    if (flagged && inRevealedRegion(board, r, c))
      newDisplay[r][c] = board[r][c] === 0 ? EMPTY : board[r][c];
    else newDisplay[r][c] = flagged ? UNSELECTED : FLAG;
    setDisplay(newDisplay);
    setBombsRemaining(bombsRemaining + (flagged ? 1 : -1));
  };

  const inRevealedRegion = (board, r, c) => {
    // Unhandled edge case: when a flag(s) stop an empty region from
    // fully revealing, unflagging should complete the reveal
    let inRevealedRegion = false;
    MS.visitNeighbors(board, r, c, (r, c) => {
      if (display[r][c] === EMPTY) inRevealedRegion = true;
    });
    return inRevealedRegion;
  };

  const reset = (difficulty) => {
    const { rows, cols } = difficulty;
    setDisplay(MS.getBoardOf(rows, cols, ""));
  };

  const showBombs = (board) => {
    setDisplay(
      display.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isBomb = board[rowIndex][colIndex] === BOMB;
          const isUnflagged = cell !== FLAG;
          return isBomb && isUnflagged ? BOMB : cell;
        })
      )
    );
  };

  return [display, setDisplay, updateCell, toggleFlag, reset, showBombs];
};

export default useDisplay;
