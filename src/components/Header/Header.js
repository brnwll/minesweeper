import React from "react";
import HeaderLogo from "../../assets/images/header-logo.png";
import DifficultyForm from "../DifficultyForm/DifficultyForm";
import Timer from "../Timer/Timer";
import { PLAYING } from "../../helpers/Constants";
import "./Header.css";

const Header = ({ difficultyChange, gameState, bombsRemaining }) => {
  return (
    <header>
      <img src={HeaderLogo} alt="Minesweeper" />
      <h1>Minesweeper</h1>
      <DifficultyForm difficultyChange={difficultyChange} />
      <Timer gameState={gameState} />
      {gameState === PLAYING && (
        <div id="bombCounter">
          <span>💣</span> {bombsRemaining}
        </div>
      )}
    </header>
  );
};

export default Header;

