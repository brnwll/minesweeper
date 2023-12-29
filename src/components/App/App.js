import { useState, useEffect } from "react";
import useDifficulty from "../../hooks/useDifficulty";
import useDisplay from "../../hooks/useDisplay";
import useBoard from "../../hooks/useBoard";
import Header from "../Header/Header";
import Timer from "../Timer/Timer";
import DifficultyForm from "../DifficultyForm/DifficultyForm";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import * as MS from "../../helpers/Minesweeper";
import { NOT_STARTED, PLAYING, WON, LOST } from "../../helpers/Constants";
import { BOMB, EMPTY, FLAG, UNSELECTED, EASY } from "../../helpers/Constants";
import "./App.css";

function App() {
  const [difficulty, setDifficulty, getDifficulty] = useDifficulty(EASY);
  const [bombsRemaining, setBombsRemaining] = useState(difficulty.bombs);
  const [board, resetBoard] = useBoard(difficulty);
  const [display, updateCell, toggleFlag, resetDisplay, showBombs] =
    useDisplay(difficulty); // what user sees
  const [gameStatus, setGameStatus] = useState(NOT_STARTED);

  const prevent = (clickType, r, c) => {
    return clickType === "right"
      ? display[r][c] !== UNSELECTED && display[r][c] !== FLAG // right
      : display[r][c] !== UNSELECTED; // left
  };

  const click = (r, c, type) => {
    if (gameStatus === NOT_STARTED) setGameStatus(PLAYING);
    if (gameStatus === LOST || gameStatus === WON) return;
    if (prevent(type, r, c)) return;
    if (type === "left") leftClick(r, c);
    if (type === "right") rightClick(r, c);
    gameState();
  };

  const leftClick = (r, c) => {
    if (board[r][c] === BOMB) bombClick(r, c);
    else if (board[r][c] === 0) zeroClick(r, c);
    else numberClick(r, c);
  };

  const bombClick = (r, c) => {
    updateCell(r, c, BOMB);
    setGameStatus(LOST);
  };

  const zeroClick = (r, c) => {
    updateCell(r, c, EMPTY);
    MS.visitNeighbors(board, r, c, (r, c) => {
      if (display[r][c] === UNSELECTED) leftClick(r, c);
    });
  };

  const numberClick = (r, c) => updateCell(r, c, board[r][c]);

  const rightClick = (r, c) =>
    toggleFlag(r, c, board, bombsRemaining, setBombsRemaining);

  const gameState = () => {
    const formattedDisplayToMatchBoard = display.map((row) =>
      row.map((cell) => {
        if (cell === FLAG) return BOMB;
        if (cell === EMPTY) return 0;
        return cell;
      })
    );

    if (display.toString().includes(BOMB)) {
      setGameStatus(LOST);
      showBombs(board);
    } else if (board.toString() === formattedDisplayToMatchBoard.toString()) {
      setGameStatus(WON);
    }
  };

  useEffect(() => {
    if (gameStatus === WON) {
      // TODO: feedback
    } else if (gameStatus === LOST) {
      // TODO: feedback
    }
  }, [gameStatus]);

  const difficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    setGameStatus(NOT_STARTED);
    resetBoard(getDifficulty(difficulty));
    resetDisplay(getDifficulty(difficulty));
    setBombsRemaining(getDifficulty(difficulty).bombs);
  };

  return (
    <div id="App">
      <Header />
      <p>Game State: {gameStatus}</p>
      <p>Bombs Remaining: {bombsRemaining}</p>
      <DifficultyForm onDifficultyChange={difficultyChange} />
      <Timer gameStatus={gameStatus} />
      <Board display={display} handleCellClick={click} />
      <Footer />
    </div>
  );
}

export default App;
