import "./Cell.css";
import { BOMB, EMPTY, FLAG } from "../../helpers/Constants";

const Cell = ({ cell, row, col, handleCellClick }) => {
  const onClick = (e) => {
    e.preventDefault();
    handleCellClick(row, col, "left");
  };

  const rightClick = (e) => {
    e.preventDefault();
    handleCellClick(row, col, "right");
  };

  const getClassName = () => {
    let className = "cell";
    switch (cell) {
      case EMPTY:
        className += " cleared";
        break;
      case BOMB:
        className += " bomb";
        break;
      case FLAG:
        className += " flag";
        break;
      case 1:
        className += " one";
        break;
      case 2:
        className += " two";
        break;
      case 3:
        className += " three";
        break;
      case 4:
        className += " four";
        break;
      case 5:
        className += " five";
        break;
      case 6:
        className += " six";
        break;
      case 7:
        className += " seven";
        break;
      case 8:
        className += " eight";
        break;
      default:
        break;
    }
    return className;
  };

  return (
    <div
      className={getClassName()}
      onClick={onClick}
      onContextMenu={rightClick}
    >
      {cell}
    </div>
  );
};

export default Cell;
