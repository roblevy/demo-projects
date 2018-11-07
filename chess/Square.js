/* global board */

class Square {
  constructor(row, column, isWhite) {
    this.row = row;
    this.column = column;
    this.name = 'ABCDEFGH'.charAt(column - 1) + row;
    this.isWhite = isWhite;
    this.colour = isWhite ? 'white' : 'black';
  }

  isDiagonalFrom(square) {
    return Math.abs(this.row - square.row) === Math.abs(this.column - square.column);
  }

  isStraightLineFrom(square) {
    return this.row - square.row === 0 || this.column - square.column === 0;
  }

  isNeighbourOf(square) {
    return Math.max(Math.abs(this.row - square.row), Math.abs(this.column - square.column)) === 1;
  }

  isAbove(square) {
    return this.row - square.row > 0;
  }

  isBelow(square) {
    return this.row - square.row < 0;
  }

  overlapsWith(square) {
    return this.row === square.row && this.column === square.column;
  }

  routeTo(square2) {
    if (!this.isDiagonalFrom(square2) && !this.isStraightLineFrom(square2)) return [];
    const squares = [];
    let square = this;
    while(!square.overlapsWith(square2)) {
      const changeInRow = (square2.row > square.row) ? 1 :
        (square2.row < square.row) ? -1 : 0;
      const changeInColumn = (square2.column > square.column) ? 1 :
        (square2.column < square.column) ? -1 : 0;
      square = board.squareAt(square.row + changeInRow, square.column + changeInColumn);
      if (square.piece) {
        if (square.piece.colour !== this.piece.colour) {
          squares.push(square);
        }
        break;
      } else {
        squares.push(square);
      }
    }
    return squares;
  }

  routeIsBlockedTo(square) {
    return !this.routeTo(square).includes(square);
  }
}
