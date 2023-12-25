import Cell from "../Cell/Cell";
import "./Board.css";

const Board = ({ display, handleCellClick }) => {
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
    </main>
  );
};

export default Board;
