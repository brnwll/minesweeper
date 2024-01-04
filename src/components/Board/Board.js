import Cell from "../Cell/Cell";
import WinLoseModal from "../WinLoseModal/WinLoseModal";
import "./Board.css";
import { WON, LOST } from "../../helpers/Constants";

const Board = ({ display, handleCellClick, gameState, setGameState }) => {
  const gameOver = gameState === WON || gameState === LOST;
  return (
    <main>
      {gameOver && (
        <WinLoseModal gameState={gameState} setGameState={setGameState} />
      )}
      {display.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <Cell
              row={rowIndex}
              col={cellIndex}
              key={cellIndex}
              cell={cell}
              handleCellClick={handleCellClick}
            />
          ))}
        </div>
      ))}
    </main>
  );
};

export default Board;
