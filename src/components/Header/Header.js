import React from "react";
import HeaderLogo from "../../assets/images/header-logo.png";
import DifficultyForm from "../DifficultyForm/DifficultyForm";
import Timer from "../Timer/Timer";
import "./Header.css";

const Header = ({ difficultyChange, gameState }) => {
  return (
    <header>
      <img src={HeaderLogo} alt="Minesweeper" />
      <h1>Minesweeper</h1>
      <DifficultyForm difficultyChange={difficultyChange} />
      <Timer gameState={gameState} />
    </header>
  );
};

export default Header;
