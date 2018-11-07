/* global Piece, Square */
class Board {
  constructor() {
    this.board = [];
    this.constructBoard();
  }

  constructBoard() {
    let isWhite = false;
    const $board = document.getElementById('board');
    for (let i = 0; i < 8; i++) {
      const $row = document.createElement('div');
      $row.classList = 'row';
      for (let j = 0; j < 8; j++) {
        const $square = document.createElement('div');
        $square.classList = 'square';
        this.board.push(new Square(i + 1, j + 1, isWhite, $square));
        isWhite = !isWhite;
        $row.appendChild($square);
      }
      $board.appendChild($row);
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
