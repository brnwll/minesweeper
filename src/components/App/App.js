import { useState, useEffect } from "react";
import useDifficulty from "../../hooks/useDifficulty";
import useDisplay from "../../hooks/useDisplay";
import useBoard from "../../hooks/useBoard";
import Header from "../Header/Header";
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
  const [gameState, setGameState] = useState(NOT_STARTED);

  const prevent = (clickType, r, c) => {
    return clickType === "right"
      ? display[r][c] !== UNSELECTED && display[r][c] !== FLAG // right
      : display[r][c] !== UNSELECTED; // left
  };

  const click = (r, c, type) => {
    if (gameState === NOT_STARTED) setGameState(PLAYING);
    if (gameState === LOST || gameState === WON) return;
    if (prevent(type, r, c)) return;
    if (type === "left") leftClick(r, c);
    if (type === "right") rightClick(r, c);
    checkWinOrLose(); // win or lose
  };

  const leftClick = (r, c) => {
    if (board[r][c] === BOMB) bombClick(r, c);
    else if (board[r][c] === 0) zeroClick(r, c);
    else numberClick(r, c);
  };

  const bombClick = (r, c) => {
    updateCell(r, c, BOMB);
    setGameState(LOST);
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

  const checkWinOrLose = () => {
    const lose = display.toString().includes(BOMB);
    const win = board.toString() === mask(display).toString();
    if (lose) {
      setGameState(LOST);
      showBombs(board);
    } else if (win) setGameState(WON);
  };

  // hide portions of display to reveal board state below
  const mask = (display) => display.map((r) => r.map((c) => maskParams(c)));
  const maskParams = (cell) => {
    if (cell === FLAG) return BOMB;
    if (cell === EMPTY) return 0;
    return cell;
  };

  const difficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    setGameState(NOT_STARTED);
    resetBoard(getDifficulty(difficulty));
    resetDisplay(getDifficulty(difficulty));
    setBombsRemaining(getDifficulty(difficulty).bombs);
  };

  useEffect(() => {
    if (gameState === WON) {
      // TODO: feedback
    } else if (gameState === LOST) {
      // TODO: feedback
    }
  }, [gameState]);

  return (
    <div id="App">
      <Header
        difficultyChange={difficultyChange}
        gameState={gameState}
        bombsRemaining={bombsRemaining}
      />
      <Board display={display} handleCellClick={click} />
      <Footer />
    </div>
  );
}

export default App;
