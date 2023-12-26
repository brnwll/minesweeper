import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import * as Minesweeper from "../Helpers/Minesweeper";
import * as Constants from "../Helpers/Constants";
import "./App.css";

const initSize = 15; // TODO: make this a user input
const initBomb = 20; // TODO: make this a user input
const initialBoard = Minesweeper.initializeBoard(initSize, initSize, initBomb);
const initialDisplay = Minesweeper.getBoardOf(initSize, initSize, "");

function App() {
  const [board, setBoard] = useState(initialBoard); // underlying board state
  const [display, setDisplay] = useState(initialDisplay); // what user sees
  // gameState - game state (playing, won, lost)

  const handleCellClick = (rowIndex, cellIndex, clickType) => {
    if (preventCellClick(clickType, rowIndex, cellIndex)) return;
    clickType === "right"
      ? handleCellRightClick(rowIndex, cellIndex)
      : handleCellLeftClick(rowIndex, cellIndex);
  };

  const handleCellLeftClick = (rowIndex, cellIndex) => {
    // TODO: if cell is a 0, reveal empty cells around it
    // TODO: don't display 0, instead display space ' '? or empty string ''?
    setDisplay(
      display.map((row, rowIdx) =>
        row.map((cell, cellIdx) => {
          if (rowIdx === rowIndex && cellIdx === cellIndex) {
            return board[rowIdx][cellIdx];
          } else {
            return cell;
          }
        })
      )
    );
  };

  const handleCellRightClick = (rowIndex, cellIndex) => {
    let newDisplay = [...display];
    newDisplay[rowIndex][cellIndex] =
      newDisplay[rowIndex][cellIndex] === Constants.FLAG
        ? Constants.EMPTY
        : Constants.FLAG;
    setDisplay(newDisplay);
  };

  const preventCellClick = (clickType, rowIndex, cellIndex) => {
    const cell = display[rowIndex][cellIndex];
    return clickType === "right"
      ? cell !== Constants.EMPTY && cell !== Constants.FLAG // right click
      : cell !== Constants.EMPTY; // left click
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
