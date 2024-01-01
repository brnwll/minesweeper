import Cell from "../Cell/Cell";
import "./Board.css";
import { WON, LOST } from "../../helpers/Constants";

const Board = ({ display, handleCellClick, gameState }) => {
  return (
    <main>
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
      {gameState === WON && <p class="gameStatus">YOU WIN!</p>}
      {gameState === LOST && <p class="gameStatus">YOU LOSE!</p>}
    </main>
  );
};

export default Board;
