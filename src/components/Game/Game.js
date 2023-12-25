import React from "react";
import "./Game.css";

// temp game board
const gameBoard = [
  ["1", "2", "💣", "1", " "],
  ["💣", "2", "2", "2", "1"],
  ["1", "1", "1", "💣", "1"],
  [" ", "1", "2", "2", "1"],
  [" ", "1", "💣", "1", " "],
];

const Game = () => {
  return (
    <main>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="cell">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </main>
  );
};

export default Game;
