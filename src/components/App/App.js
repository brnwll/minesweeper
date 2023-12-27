import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Timer from "../Timer/Timer";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import * as Minesweeper from "../Helpers/Minesweeper";
import * as Constant from "../Helpers/Constants";
import "./App.css";

const initSize = 15; // TODO: make this a user input, move to state
const initBomb = 1; // TODO: make this a user input, move to state
const initialBoard = Minesweeper.initializeBoard(initSize, initSize, initBomb);
const initialDisplay = Minesweeper.getBoardOf(initSize, initSize, "");

function App() {
  const [board, setBoard] = useState(initialBoard); // underlying board state
  const [display, setDisplay] = useState(initialDisplay); // what user sees
  const [gameState, setGameState] = useState(Constant.NOT_STARTED);
  const [difficulty, setDifficulty] = useState(Constant.EASY);

  const preventCellClick = (clickType, rowIndex, cellIndex) => {
    const cell = display[rowIndex][cellIndex];
    return clickType === "right"
      ? cell !== Constant.UNSELECTED && cell !== Constant.FLAG // right click
      : cell !== Constant.UNSELECTED; // left click
  };

  const handleCellClick = (rowIndex, cellIndex, clickType) => {
    if (gameState === Constant.NOT_STARTED) setGameState(Constant.PLAYING);
    if (gameState === Constant.LOST || gameState === Constant.WON) return;
    if (preventCellClick(clickType, rowIndex, cellIndex)) return;
    if (clickType === "left") handleCellLeftClick(rowIndex, cellIndex);
    if (clickType === "right") handleCellRightClick(rowIndex, cellIndex);
  };

  const handleCellLeftClick = (rowIndex, cellIndex) => {
    const cell = board[rowIndex][cellIndex];
    if (cell === Constant.BOMB) handleCellWithBombClick(rowIndex, cellIndex);
    else if (cell === 0) handleCellWithZeroClick(rowIndex, cellIndex);
    else handleCellWithNumberClick(rowIndex, cellIndex);
  };

  const handleCellWithBombClick = (rowIndex, cellIndex) => {
    updateDisplayCell(rowIndex, cellIndex, Constant.BOMB);
    // TODO: reveal all bombs and end game
  };

  const handleCellWithZeroClick = (rowIndex, cellIndex) => {
    updateDisplayCell(rowIndex, cellIndex, Constant.EMPTY);
    Minesweeper.visitNeighbors(board, rowIndex, cellIndex, (r, c) => {
      if (display[r][c] === Constant.UNSELECTED) handleCellLeftClick(r, c);
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
      newDisplay[rowIndex][cellIndex] === Constant.FLAG
        ? Constant.UNSELECTED
        : Constant.FLAG;
    setDisplay(newDisplay);
  };

  useEffect(() => {
    if (gameState !== Constant.PLAYING) return;
    // if display contains a BOMB, game over, display ALL bombs
    Minesweeper.traverse(display, (r, c) => {
      if (display[r][c] === Constant.BOMB) {
        setGameState(Constant.LOST);
        // TODO: reveal all bombs and end game
        return;
      }
    });
    /*
    display.forEach((row) => {
      for (let cell of row) {
        if (cell === Constant.BOMB) {
          setGameState(Constant.LOST);
          return;
        }
      }
    });
    */

    // if display contains only integers, " " and flags
    // and if flag count matches bomb count, game won
  }, [display]);

  return (
    <div id="App">
      <Header />
      <p>Game State: {gameState}</p>
      <form>
        <label htmlFor="difficulty">Difficulty:</label>
        <input type="radio" id="easy" name="difficulty" value="easy" />
        <label htmlFor="easy">Easy</label>
        <input type="radio" id="medium" name="difficulty" value="medium" />
        <label htmlFor="medium">Medium</label>
        <input type="radio" id="hard" name="difficulty" value="hard" />
        <label htmlFor="hard">Hard</label>
      </form>
      <Timer gameState={gameState} />
      <Board display={display} handleCellClick={handleCellClick} />
      <Footer />
    </div>
  );
}

export default App;
