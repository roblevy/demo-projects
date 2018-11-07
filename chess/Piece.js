/* global board, Square, board */
/* eslint-disable no-unused-vars */
class Piece {
  constructor(squareName, colour, name) {
    this.square = board.sq(squareName);
    this.square.piece = this;
    this.row = this.square.row;
    this.column = this.square.column;
    this.colour = colour;
    this.name = name;
  }

  availableSquares() {
    return board.filter(square => this.squareIsAvailable(square));
  }
}

class King extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, 'k');
  }

  squareIsAvailable(square) {
    return square.isNeighbourOf(this.square)
       && !this.square.routeIsBlockedTo(square);
  }
}

class Queen extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, 'q');
  }

  squareIsAvailable(square) {
    return (
      square.isDiagonalFrom(this.square) || square.isStraightLineFrom(this.square)
    ) && !this.square.routeIsBlockedTo(square);
  }
}

class Pawn extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, 'p');
  }

  squareIsAvailable(square) {
    return false;
  }
}
