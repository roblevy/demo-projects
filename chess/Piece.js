/* global board, Dom, Game, board */
/* eslint-disable no-unused-vars */
class Piece {
  constructor(squareName, colour, symbol, name) {
    this.square = board.sq(squareName);
    this.square.piece = this;
    this.row = this.square.row;
    this.column = this.square.column;
    this.name = name;
    this.colour = colour;
    this.opponentColour = colour === 'white' ? 'black' : 'white';
    this.symbol = symbol;
    this.square.render();
  }

  availableSquares() {
    return board.filter(square => this.squareIsAvailable(square));
  }

  attemptMoveTo(square) {
    if (Game.isInCheck(this.colour) && !Game.pieceMovesPreventingCheck(this).includes(square)) {
      Dom.message('This move does not prevent check');
      return false;
    }
    if (Game.simulateMove(this, square, () => Game.isInCheck(this.colour))) {
      Dom.message('You cannot move into check');
      return false;
    }
    if (this.squareIsAvailable(square)) {
      Dom.message('Move ' + this.symbol + ' to ' + square.name);
      if (square.hasOppenentOf(this)) {
        this.takes(square.piece);
      }
      this.moveTo(square);
      this.hasMoved = true;
      return true;
    }
    return false;
  }

  moveTo(square) {
    this.square.clear();
    square.setPiece(this);
  }

  canMove() {
    return !!this.availableSquares().length;
  }

  takes(piece) {
    Dom.message(`${this.colour}
      <span class="symbol">${this.symbol}</span>
      takes ${piece.colour}
      <span class="symbol">${piece.symbol}</span>!`);
  }

  isThreatenedBy() {
    return board
      .opponentsOf(this)
      .filter(piece => piece.availableSquares().includes(this.square));
  }

  isThreatened() {
    return this.isThreatenedBy().length;
  }

  isThreateningSquares() {
    return this.availableSquares();
  }
}

class King extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♚', 'K');
  }

  squareIsAvailable(square) {
    return square.isNeighbourOf(this.square)
       && !this.square.routeIsBlockedTo(square)
       && !square.isThreatenedBy(this.opponentColour).length;
  }
}

class Queen extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♛', 'Q');
  }

  squareIsAvailable(square) {
    return (
      square.isDiagonalFrom(this.square) || square.isStraightLineFrom(this.square)
    ) && !this.square.routeIsBlockedTo(square);
  }
}

class Bishop extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♝', 'B');
  }

  squareIsAvailable(square) {
    return (
      square.isDiagonalFrom(this.square)
    ) && !this.square.routeIsBlockedTo(square);
  }
}

class Knight extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♞', 'N');
  }

  squareIsAvailable(square) {
    return square.isKnightsMoveFrom(this.square) && !square.hasTeamMateOf(this);
  }
}

class Rook extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♜', 'R');
  }

  squareIsAvailable(square) {
    return (
      square.isStraightLineFrom(this.square)
    ) && !this.square.routeIsBlockedTo(square);
  }
}

class Pawn extends Piece {
  constructor(squareName, colour) {
    super(squareName, colour, '♟', 'p');
    this.hasMoved = false;
  }

  squareIsAvailable(square) {
    const here = this.square;
    let isAvailable = this.squareIsForwardOf(square);
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
        || (this.isThreatening(square) && square.hasOppenentOf(this))
      );
    return isAvailable && !here.routeIsBlockedTo(square);
  }

  squareIsForwardOf(square) {
    switch(this.colour) {
      case 'black':
        return square.isAbove(this.square);
      case 'white':
        return square.isBelow(this.square);
    }
  }

  isThreatening(square) {
    return this.squareIsForwardOf(square)
      && square.isDiagonalFrom(this.square)
      && square.isNeighbourOf(this.square);
  }

  isThreateningSquares() {
    // TODO: Finish this. Which squares is this pawn threatening?
    return board.filter(square => this.isThreatening(square));
  }
}
