import { BOMB, UNSELECTED } from "./Constants";

export const initializeBoard = (numRows, numCols, bombCount) => {
  let board = getBoardOf(numRows, numCols, 0);
  addBombsTo(board, bombCount);
  addAdjacentBombCountsTo(board);
  return board;
};

export const getBoardOf = (rows, cols, fillValue) =>
  Array(rows)
    .fill("")
    .map(() => Array(cols).fill(fillValue));

export const addBombsTo = (board, bombCount) => {
  let bombsPlaced = 0;
  while (bombsPlaced < bombCount) {
    const row = Math.floor(Math.random() * board.length);
    const col = Math.floor(Math.random() * board[0].length);
    if (board[row][col] === 0) {
      board[row][col] = BOMB;
      bombsPlaced++;
    }
  }
};

export const addAdjacentBombCountsTo = (board) => {
  const incNeighbor = (r, c) => board[r][c] !== BOMB && board[r][c]++;
  const incNeighborsOfBomb = (r, c) =>
    board[r][c] === BOMB && visitNeighbors(board, r, c, incNeighbor);
  traverse(board, incNeighborsOfBomb);
};

export const visitNeighbors = (board, row, col, callback) => {
  row = parseInt(row);
  col = parseInt(col);
  const neighbors = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];
  neighbors.forEach((neighbor) => {
    const [row, col] = neighbor;
    if (!outOfBounds(board, row, col)) callback(row, col);
  });
};

export const traverse = (board, callback) => {
  for (let rowIndex in board) {
    for (let colIndex in board[rowIndex]) {
      callback(rowIndex, colIndex);
    }
  }
};

export const isEmpty = (display) => {
  let isEmpty = true;
  traverse(display, (r, c) => {
    if (display[r][c] !== UNSELECTED) isEmpty = false;
  });
  return isEmpty;
};

export const outOfBounds = (board, row, col) =>
  row < 0 || row >= board.length || col < 0 || col >= board[0].length;
