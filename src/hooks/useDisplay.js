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

  // TODO: REQUIRES REFACTORING
  const updateFlag = (r, c, board, bombsRemaining, setBombsRemaining) => {
    const wasFlagged = display[r][c] === FLAG; // cell previously flagged
    if (bombsRemaining > 0 || wasFlagged) {
      // prevent adding more flags than bombs, always allow removing flags
      let newDisplay = [...display];
      // EDGE: flag is inside region that would have been revealed,
      // when unflagged, display as if it had been revealed
      let emptyNeighborFound = false;
      if (wasFlagged) {
        console.log("wasFlagged");
        MS.visitNeighbors(board, r, c, (r, c) => {
          if (board[r][c] === 0) emptyNeighborFound = true;
        });
      }
      if (emptyNeighborFound) {
        console.log("emptyNeighborFound");
        newDisplay[r][c] = board[r][c] === 0 ? EMPTY : board[r][c];
      } else {
        newDisplay[r][c] = wasFlagged ? UNSELECTED : FLAG;
      }
      setDisplay(newDisplay);
      setBombsRemaining(bombsRemaining + (wasFlagged ? 1 : -1));
    }
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

  return [display, setDisplay, updateCell, updateFlag, reset, showBombs];
};

export default useDisplay;
