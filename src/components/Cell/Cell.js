import "./Cell.css";
import { BOMB, EMPTY, FLAG } from "../../helpers/Constants";

const Cell = ({ cell, row, col, handleCellClick }) => {
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

  const onClick = (e) => {
    e.preventDefault();
    handleCellClick(row, col, "left");
  };

  const rightClick = (e) => {
    e.preventDefault();
    handleCellClick(row, col, "right");
  };

  // Touch Screens...
  // wait half a second before triggering onClick
  // cancel onClick if onTouchEnd is triggered
  const onTouchStart = (e) => contextMenuTimer(e);
  const onTouchEnd = (e) => clearInterval(contextMenuTimer);
  const contextMenuTimer = (e) => setTimeout(() => rightClick(e), 500);

  return (
    <div
      className={getClassName()}
      onClick={onClick}
      onContextMenu={rightClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {cell}
    </div>
  );
};

export default Cell;
