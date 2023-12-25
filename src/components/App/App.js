import { useState } from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import "./App.css";

// temp game board
/*
const tempGameBoard = [
  ["1", "2", "💣", "1", " "],
  ["💣", "2", "2", "2", "1"],
  ["1", "1", "1", "💣", "1"],
  [" ", "1", "2", "2", "1"],
  [" ", "1", "💣", "1", " "],
];
*/

const tempDisplay = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

function App() {
  // What state will be required?
  // gameBoard - matrix of cells (locating bombs, counting adjacent bombs, etc.)
  //const [gameBoard, setGameBoard] = useState(tempGameBoard);
  // gameDisplay - what the user sees (revealed, flagged, hidden)
  const [display, setDisplay] = useState(tempDisplay);
  // gameState - game state (playing, won, lost)

  const handleCellClick = (rowIndex, cellIndex, clickType) => {
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
