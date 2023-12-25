import React from "react";
import HeaderLogo from "../../assets/images/header-logo.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <img src={HeaderLogo} alt="Minesweeper" />
      <h1>Minesweeper</h1>
    </header>
  );
};

export default Header;
