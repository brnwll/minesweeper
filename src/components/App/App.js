import { useState, useEffect } from "react";
import useDifficulty from "../../hooks/useDifficulty";
import Header from "../Header/Header";
import Timer from "../Timer/Timer";
import DifficultyForm from "../DifficultyForm/DifficultyForm";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import * as Minesweeper from "../../helpers/Minesweeper";
import {
  EASY,
  NOT_STARTED,
  PLAYING,
  WON,
  LOST,
  BOMB,
  EMPTY,
  FLAG,
  UNSELECTED,
} from "../../helpers/Constants";
import "./App.css";

function App() {
  const [difficulty, setDifficulty] = useDifficulty(EASY);
  const [bombsRemaining, setBombsRemaining] = useState(difficulty.bombs);
  const [board, setBoard] = useState(
    Minesweeper.initializeBoard(
      difficulty.rows,
      difficulty.cols,
      difficulty.bombs
    )
  );
  const [display, setDisplay] = useState(
    Minesweeper.getBoardOf(difficulty.rows, difficulty.cols, "")
  ); // what user sees
  const [gameState, setGameState] = useState(NOT_STARTED);

  const preventCellClick = (clickType, rowIndex, cellIndex) => {
    const cell = display[rowIndex][cellIndex];
    return clickType === "right"
      ? cell !== UNSELECTED && cell !== FLAG // right click
      : cell !== UNSELECTED; // left click
  };

  const handleCellClick = (rowIndex, cellIndex, clickType) => {
    if (gameState === NOT_STARTED) setGameState(PLAYING);
    if (gameState === LOST || gameState === WON) return;
    if (preventCellClick(clickType, rowIndex, cellIndex)) return;
    if (clickType === "left") handleCellLeftClick(rowIndex, cellIndex);
    if (clickType === "right") handleCellRightClick(rowIndex, cellIndex);
    checkGameStatus();
  };

  const handleCellLeftClick = (rowIndex, cellIndex) => {
    const cell = board[rowIndex][cellIndex];
    if (cell === BOMB) handleCellWithBombClick(rowIndex, cellIndex);
    else if (cell === 0) handleCellWithZeroClick(rowIndex, cellIndex);
    else handleCellWithNumberClick(rowIndex, cellIndex);
  };

  const handleCellWithBombClick = (rowIndex, cellIndex) => {
    updateDisplayCell(rowIndex, cellIndex, BOMB);
    setGameState(LOST);
  };

  const handleCellWithZeroClick = (rowIndex, cellIndex) => {
    updateDisplayCell(rowIndex, cellIndex, EMPTY);
    Minesweeper.visitNeighbors(board, rowIndex, cellIndex, (r, c) => {
      if (display[r][c] === UNSELECTED) handleCellLeftClick(r, c);
    });
  };

  const updateDisplayCell = (rowIndex, cellIndex, value) => {
    const newDisplay = [...display];
    newDisplay[rowIndex][cellIndex] = value;
    setDisplay(newDisplay);
  };

  const handleCellWithNumberClick = (rowIndex, cellIndex) => {
    updateDisplayCell(rowIndex, cellIndex, board[rowIndex][cellIndex]);
  };

  const handleCellRightClick = (r, c) => {
    const displayCell = display[r][c];
    const boardCell = board[r][c];
    const wasFlagged = displayCell === FLAG;
    if (bombsRemaining > 0 || wasFlagged) {
      // prevent adding more flags than bombs, always allow removing flags
      let newDisplay = [...display];
      // TODO: if a flag is removed and it is in a region that would have
      // been revealed by the algorithm in handleCellWithZeroClick, then
      // we need to re-run that algorithm to reveal the region.
      // Possible edge case: if the flag was on the border of the region.
      // visit neighbors, if any neighbor is EMPTY, then set to board value
      // if all neighbors are numbers, then set to EMPTY
      let emptyNeighborFound = false;
      if (wasFlagged) {
        Minesweeper.visitNeighbors(board, r, c, (r, c) => {
          const neighbor = board[r][c];
          if (neighbor === 0) emptyNeighborFound = true;
        });
      }
      if (emptyNeighborFound) {
        newDisplay[r][c] = board[r][c] === 0 ? EMPTY : board[r][c];
      } else {
        newDisplay[r][c] = wasFlagged ? UNSELECTED : FLAG;
      }
      console.log(wasFlagged);
      setBombsRemaining(bombsRemaining + (wasFlagged ? 1 : -1));
      setDisplay(newDisplay);
    }
  };

  const checkGameStatus = () => {
    const formattedDisplayToMatchBoard = display.map((row) =>
      row.map((cell) => {
        if (cell === FLAG) return BOMB;
        if (cell === EMPTY) return 0;
        return cell;
      })
    );
    if (board.toString() === formattedDisplayToMatchBoard.toString()) {
      setGameState(WON);
    } else if (display.toString().includes(BOMB)) {
      setGameState(LOST);
      displayAllUnflaggedBombs();
    }
  };

  const displayAllUnflaggedBombs = () => {
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

  useEffect(() => {
    const { rows, cols, bombs } = difficulty;
    setBoard(Minesweeper.initializeBoard(rows, cols, bombs));
    setDisplay(Minesweeper.getBoardOf(rows, cols, ""));
    setGameState(NOT_STARTED);
    setBombsRemaining(bombs);
  }, [difficulty]);

  useEffect(() => {
    if (gameState === WON) {
      // TODO: feedback
    } else if (gameState === LOST) {
      // TODO: feedback
    }
  }, [gameState]);

  return (
    <div id="App">
      <Header />
      <p>Game State: {gameState}</p>
      <p>Bombs Remaining: {bombsRemaining}</p>
      <DifficultyForm onDifficultyChange={setDifficulty} />
      <Timer gameState={gameState} />
      <Board display={display} handleCellClick={handleCellClick} />
      <Footer />
    </div>
  );
}

export default App;
