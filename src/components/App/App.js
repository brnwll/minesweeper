import { useState, useEffect } from "react";
import useDifficulty from "../../hooks/useDifficulty";
import useDisplay from "../../hooks/useDisplay";
import Header from "../Header/Header";
import Timer from "../Timer/Timer";
import DifficultyForm from "../DifficultyForm/DifficultyForm";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import * as Minesweeper from "../../helpers/Minesweeper";
import { NOT_STARTED, PLAYING, WON, LOST } from "../../helpers/Constants";
import { BOMB, EMPTY, FLAG, UNSELECTED, EASY } from "../../helpers/Constants";
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
  const [display, setDisplay, updateCell, toggleFlag, resetDisplay, showBombs] =
    useDisplay(difficulty); // what user sees
  const [gameStatus, setGameStatus] = useState(NOT_STARTED);

  const preventCellClick = (clickType, rowIndex, cellIndex) => {
    const cell = display[rowIndex][cellIndex];
    return clickType === "right"
      ? cell !== UNSELECTED && cell !== FLAG // right click
      : cell !== UNSELECTED; // left click
  };

  const handleCellClick = (rowIndex, cellIndex, clickType) => {
    if (gameStatus === NOT_STARTED) setGameStatus(PLAYING);
    if (gameStatus === LOST || gameStatus === WON) return;
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
    updateCell(rowIndex, cellIndex, BOMB);
    setGameStatus(LOST);
  };

  const handleCellWithZeroClick = (rowIndex, cellIndex) => {
    updateCell(rowIndex, cellIndex, EMPTY);
    Minesweeper.visitNeighbors(board, rowIndex, cellIndex, (r, c) => {
      if (display[r][c] === UNSELECTED) handleCellLeftClick(r, c);
    });
  };

  const handleCellWithNumberClick = (rowIndex, cellIndex) => {
    updateCell(rowIndex, cellIndex, board[rowIndex][cellIndex]);
  };

  const handleCellRightClick = (r, c) => {
    toggleFlag(r, c, board, bombsRemaining, setBombsRemaining);
  };

  const checkGameStatus = () => {
    const formattedDisplayToMatchBoard = display.map((row) =>
      row.map((cell) => {
        if (cell === FLAG) return BOMB;
        if (cell === EMPTY) return 0;
        return cell;
      })
    );

    // BUG: click on bomb for last move instead of flagging it.
    // Reads as a win, but should be a loss.

    if (board.toString() === formattedDisplayToMatchBoard.toString()) {
      setGameStatus(WON);
    } else if (display.toString().includes(BOMB)) {
      setGameStatus(LOST);
      showBombs(board);
    }
  };

  useEffect(() => {
    const { rows, cols, bombs } = difficulty;
    setBoard(Minesweeper.initializeBoard(rows, cols, bombs));
    resetDisplay(difficulty);
    setGameStatus(NOT_STARTED);
    setBombsRemaining(bombs);
  }, [difficulty]); // TODO : Fix this warning

  useEffect(() => {
    if (gameStatus === WON) {
      // TODO: feedback
    } else if (gameStatus === LOST) {
      // TODO: feedback
    }
  }, [gameStatus]);

  return (
    <div id="App">
      <Header />
      <p>Game State: {gameStatus}</p>
      <p>Bombs Remaining: {bombsRemaining}</p>
      <DifficultyForm onDifficultyChange={setDifficulty} />
      <Timer gameStatus={gameStatus} />
      <Board display={display} handleCellClick={handleCellClick} />
      <Footer />
    </div>
  );
}

export default App;
