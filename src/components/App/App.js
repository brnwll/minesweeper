import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import * as Minesweeper from "../Helpers/Minesweeper";
import { BOMB, FLAG, UNSELECTED, EMPTY } from "../Helpers/Constants";
import "./App.css";

const initSize = 15; // TODO: make this a user input
const initBomb = 35; // TODO: make this a user input
const initialBoard = Minesweeper.initializeBoard(initSize, initSize, initBomb);
const initialDisplay = Minesweeper.getBoardOf(initSize, initSize, "");

function App() {
  const [board, setBoard] = useState(initialBoard); // underlying board state
  const [display, setDisplay] = useState(initialDisplay); // what user sees
  // gameState - game state (playing, won, lost)

  const preventCellClick = (clickType, rowIndex, cellIndex) => {
    const cell = display[rowIndex][cellIndex];
    return clickType === "right"
      ? cell !== UNSELECTED && cell !== FLAG // right click
      : cell !== UNSELECTED; // left click
  };

  const handleCellClick = (rowIndex, cellIndex, clickType) => {
    if (preventCellClick(clickType, rowIndex, cellIndex)) return;
    if (clickType === "left") handleCellLeftClick(rowIndex, cellIndex);
    if (clickType === "right") handleCellRightClick(rowIndex, cellIndex);
  };

  const handleCellLeftClick = (rowIndex, cellIndex) => {
    const cell = board[rowIndex][cellIndex];
    if (cell === BOMB) handleCellWithBombClick(rowIndex, cellIndex);
    else if (cell === 0) handleCellWithZeroClick(rowIndex, cellIndex);
    else handleCellWithNumberClick(rowIndex, cellIndex);
  };

  const handleCellWithBombClick = (rowIndex, cellIndex) => {
    updateDisplayCell(rowIndex, cellIndex, BOMB);
    // TODO: reveal all bombs and end game
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

  const handleCellRightClick = (rowIndex, cellIndex) => {
    let newDisplay = [...display];
    newDisplay[rowIndex][cellIndex] =
      newDisplay[rowIndex][cellIndex] === FLAG ? UNSELECTED : FLAG;
    setDisplay(newDisplay);
  };

  useEffect(() => {}, [display]);

  return (
    <div id="App">
      <Header />
      <Board display={display} handleCellClick={handleCellClick} />
      <Footer />
    </div>
  );
}

export default App;
