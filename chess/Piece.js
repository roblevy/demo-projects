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
    this.square.render();
  }

  availableSquares() {
    return board.filter(square => this.squareIsAvailable(square));
  }

  moveTo(square) {
    if (this.squareIsAvailable(square)) {
      if (square.hasOppenentOf(this)) {
        this.takes(square.piece);
      }
      this.square.clear();
      square.setPiece(this);
      this.hasMoved = true;
    }
  }

  takes(piece) {
    console.log(`${this.colour} ${this.name} takes ${piece.colour} ${piece.name}!`);
  }
}

class King extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♚');
  }

  squareIsAvailable(square) {
    return square.isNeighbourOf(this.square)
       && !this.square.routeIsBlockedTo(square);
  }
}

class Queen extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♛');
  }

  squareIsAvailable(square) {
    return (
      square.isDiagonalFrom(this.square) || square.isStraightLineFrom(this.square)
    ) && !this.square.routeIsBlockedTo(square);
  }
}

class Bishop extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♝');
  }

  squareIsAvailable(square) {
    return (
      square.isDiagonalFrom(this.square)
    ) && !this.square.routeIsBlockedTo(square);
  }
}

class Knight extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♞');
  }

  squareIsAvailable(square) {
    return square.isKnightsMoveFrom(this.square) && !square.hasTeamMateOf(this);
  }
}

class Rook extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♜');
  }

  squareIsAvailable(square) {
    return (
      square.isStraightLineFrom(this.square)
    ) && !this.square.routeIsBlockedTo(square);
  }
}

class Pawn extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♟');
    this.hasMoved = false;
  }

  squareIsAvailable(square) {
    let isAvailable;
    const here = this.square;
    switch(this.colour) {
      case 'black':
        isAvailable = square.isAbove(here);
        break;
      case 'white':
        isAvailable = square.isBelow(here);
        break;
    }
    if (this.hasMoved) {
      isAvailable = isAvailable
        && square.isNeighbourOf(here);
    } else {
      isAvailable = isAvailable
      && here.routeTo(square).length <= 2;
    }
    isAvailable = isAvailable
      && (
        (square.isStraightLineFrom(here) && !square.piece)
        || (square.isDiagonalFrom(here) && square.hasOppenentOf(this) && square.isNeighbourOf(here))
      );
    return isAvailable && !here.routeIsBlockedTo(square);
  }
}
