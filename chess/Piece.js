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
    this.hasMoved = false;
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

  castle(rook) {
    if (this.canCastle(rook)) {
      const row = this.row;
      if (rook.column === 8) {
        // King's side
        this.moveTo(sq('G' + row));
        rook.moveTo(sq('F' + row));
      } else if (rook.column === 1) {
        // Queen's side
        this.moveTo(sq('C' + row));
        rook.moveTo(sq('D' + row));
      }
      Game.finishMove();
    }
  }

  canCastle(rook) {
    let message = '';
    // Is the rook of the right colour?
    if (this.colour !== rook.colour) message = 'Wrong rook';
    // Has either piece moved?
    if (this.hasMoved || rook.hasMoved) message = 'You cannot castle after moving';
    // Are any of the intervening squares threatened?
    const opponentColour = this.opponentColour;
    if (this.square.routeTo(rook.square).some(square =>
      square.isThreatenedBy(opponentColour).length)) message = 'You cannot castle through check';
    // Are any of the intervening squares occupied?
    if (this.square.squaresTo(rook.square).filter(square =>
      square.piece !== rook).some(square => square.piece)) message = 'The route to castling is blocked';
    if (message) Dom.message(message);
    return !message;
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
