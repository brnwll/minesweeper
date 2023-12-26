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
    if (clickType === "right") {
      handleCellRightClick(rowIndex, cellIndex);
    } else if (clickType === "left") {
      handleCellLeftClick(rowIndex, cellIndex);
    }
  };

  const handleCellLeftClick = (rowIndex, cellIndex) => {
    // if left click, reveal cell
    // -- if flag, do nothing
    console.log("Left click");
  };

  const handleCellRightClick = (rowIndex, cellIndex) => {
    // if right click, toggle flag
    // -- if no flag, add flag
    // -- if flag, remove flag
    let newDisplay = [...display];
    newDisplay[rowIndex][cellIndex] =
      newDisplay[rowIndex][cellIndex] === Constants.FLAG
        ? Constants.EMPTY
        : Constants.FLAG;
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
