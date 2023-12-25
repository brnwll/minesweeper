import "./Cell.css";

const Cell = ({ cell, row, col, handleCellClick }) => {
  const onClick = (e) => {
    e.preventDefault();
    handleCellClick(row, col, "left");
  };
  const rightClick = (e) => {
    e.preventDefault();
    handleCellClick(row, col, "right");
  };

  return (
    <div className="cell" onClick={onClick} onContextMenu={rightClick}>
      {cell}
    </div>
  );
};

export default Cell;
