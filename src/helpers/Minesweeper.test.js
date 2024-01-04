import {
  initializeBoard,
  getBoardOf,
  addBombsTo,
  addAdjacentBombCountsTo,
  visitNeighbors,
  traverse,
  isEmpty,
  outOfBounds,
} from "./Minesweeper";

describe("Helpers > Minesweeper", () => {
  describe("initializeBoard", () => {
    test("should return a 5 x 5 board with 5 bombs", () => {
      const board = initializeBoard(5, 5, 5);
      expect(board.length).toEqual(5);
      expect(board[0].length).toEqual(5);
      let bombCount = 0;
      let intCount = 0;
      for (let i in board) {
        for (let j in board[i]) {
          const cell = board[i][j];
          if (cell === "💣") bombCount++;
          if (Number.isInteger(cell) && cell > 0) intCount++;
        }
      }
      expect(bombCount).toEqual(5);
      expect(intCount).toBeGreaterThan(5);
    });
  });

  describe("getBoardOf", () => {
    test("should return a 5 x 5 board filled with 0's", () => {
      const board = getBoardOf(5, 5, 0);
      expect(board.length).toEqual(5);
      expect(board[0].length).toEqual(5);
      for (let i in board) {
        expect(board[i]).toEqual([0, 0, 0, 0, 0]);
      }
    });
  });

  describe("addBombsTo", () => {
    test("should add 25 bombs to a 10 x 10 board", () => {
      const board = getBoardOf(10, 10, 0);
      addBombsTo(board, 25);
      let bombCount = 0;
      for (let i in board) {
        for (let j in board[i]) {
          if (board[i][j] === "💣") bombCount++;
        }
      }
      expect(bombCount).toEqual(25);
    });
  });

  describe("addAdjacentBombCountsTo", () => {
    let before = [
      ["💣", 0, 0],
      [0, 0, 0],
      [0, "💣", 0],
    ];
    const after = [
      ["💣", 1, 0],
      [2, 2, 1],
      [1, "💣", 1],
    ];
    test("should add bomb counts to a board", () => {
      addAdjacentBombCountsTo(before);
      expect(before).toEqual(after);
    });
  });

  describe("visitNeighbors", () => {
    test("should call callback function with row and col for all in-bounds neighbors", () => {
      const board = getBoardOf(5, 5, 0);
      const callback = jest.fn((r, c) => {});
      visitNeighbors(board, 0, 0, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith(0, 1);
      expect(callback).toHaveBeenCalledWith(1, 0);
      expect(callback).toHaveBeenCalledWith(1, 1);
    });
    test("should call callback function with row and col all neighbors", () => {
      const board = getBoardOf(5, 5, 0);
      const callback = jest.fn((r, c) => {});
      visitNeighbors(board, 2, 2, callback);
      expect(callback).toHaveBeenCalledTimes(8);
      expect(callback).toHaveBeenCalledWith(1, 1);
      expect(callback).toHaveBeenCalledWith(1, 2);
      expect(callback).toHaveBeenCalledWith(1, 3);
      expect(callback).toHaveBeenCalledWith(2, 1);
      expect(callback).toHaveBeenCalledWith(2, 3);
      expect(callback).toHaveBeenCalledWith(3, 1);
      expect(callback).toHaveBeenCalledWith(3, 2);
      expect(callback).toHaveBeenCalledWith(3, 3);
    });
  });

  describe("traverse", () => {
    test("should visit 25 cells on a 5 x 5 board and call callback function", () => {
      const board = getBoardOf(5, 5, 0);
      let cellsVisited = 0;
      const callback = jest.fn(() => cellsVisited++);
      traverse(board, callback);
      expect(callback).toHaveBeenCalledTimes(25);
      expect(cellsVisited).toEqual(25);
    });
  });

  describe("isEmpty", () => {
    test('should return true if the display is empty, i.e. all cells ""', () => {
      const board = getBoardOf(5, 5, "");
      expect(isEmpty(board)).toEqual(true);
    });
    test('should return false if the display is not empty, i.e. at least one cell is not ""', () => {
      const board = getBoardOf(5, 5, "");
      board[0][0] = "💣";
      expect(isEmpty(board)).toEqual(false);
    });
  });

  describe("outOfBounds", () => {
    test("should return true if row is out of bounds", () => {
      const board = getBoardOf(5, 5, 0);
      expect(outOfBounds(board, -1, 0)).toEqual(true);
      expect(outOfBounds(board, 5, 0)).toEqual(true);
    });
    test("should return true if col is out of bounds", () => {
      const board = getBoardOf(5, 5, 0);
      expect(outOfBounds(board, 0, -1)).toEqual(true);
      expect(outOfBounds(board, 0, 5)).toEqual(true);
    });
    test("should return false if row and col are in bounds", () => {
      const board = getBoardOf(5, 5, 0);
      expect(outOfBounds(board, 0, 0)).toEqual(false);
      expect(outOfBounds(board, 4, 4)).toEqual(false);
    });
  });
});
