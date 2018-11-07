/* global Piece, Square */
class Board {
  constructor() {
    this.board = [];
    this.constructBoard();
  }

  constructBoard() {
    let isWhite = false;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.board.push(new Square(i + 1, j + 1, isWhite));
        isWhite = !isWhite;
      }
      isWhite = !isWhite;
    }
  }

  filter(callback) {
    return this.board.filter(callback);
  }

  sq(name) {
    return this.board.find(square => square.name.toLowerCase() === name.toLowerCase());
  }

  squareAt(row, column) {
    return this.board.find(square => square.row === row && square.column === column);
  }
}
