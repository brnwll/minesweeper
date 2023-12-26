import { useState } from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import * as Minesweeper from "../Helpers/Minesweeper";
import "./App.css";

const initSize = 15; // TODO: make this a user input
const initBomb = 20; // TODO: make this a user input
const initialBoard = Minesweeper.initializeBoard(initSize, initSize, initBomb);
const initialDisplay = Minesweeper.getBoardOf(initSize, initSize, "");

function App() {
  // What state will be required?
  // gameBoard - matrix of cells (locating bombs, counting adjacent bombs, etc.)
  const [board, setBoard] = useState(initialBoard);

  // gameDisplay - what the user sees (revealed, flagged, hidden)
  const [display, setDisplay] = useState(initialDisplay);
  // gameState - game state (playing, won, lost)

  const handleCellClick = (rowIndex, cellIndex, clickType) => {
    // if right click, toggle flag
    // if left click, reveal cell

    console.log(`!Clicked on cell ${rowIndex}, ${cellIndex}`);
    console.log(`!Click type ${clickType}`);
  };

  return (
    <div id="App">
      <Header />
      <Board display={display} handleCellClick={handleCellClick} />
      <Footer />
    </div>
  );
}

export default App;
