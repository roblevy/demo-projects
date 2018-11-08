/* global Game, Square, selectedSquare, whiteToPlay */
/* eslint-disable no-global-assign, no-unused-vars */
const $hint = document.getElementById('hint');
$hint.addEventListener('click', Game.giveHint);

function handleSquareClick(square) {
  return function() {
    if (!selectedSquare && square.piece
        && Game.isMyTurn(square.piece) && square.piece.availableSquares().length) {
      square.piece.availableSquares().forEach(sq => sq.highlight());
      selectedSquare = square;
    } else if (selectedSquare && selectedSquare.piece) {
      Game.move(selectedSquare.piece, square);
    } else {
      selectedSquare = null;
    }
  };
}

Square.prototype.render = function() {
  const el = this.domElement;
  const piece = this.piece;
  if (!piece) {
    el.textContent = '';
  } else {
    el.classList.remove('black-piece');
    el.classList.remove('white-piece');
    el.classList.add(`${piece.colour}-piece`);
    el.textContent = this.piece.symbol;
  }
};

class Dom {
  static message(text) {
    document.getElementById('message-board')
      .textContent = text;
  }

  static showHint(visible) {
    if (visible) {
      $hint.classList.remove('hidden');
    } else {
      $hint.classList.add('hidden');
    }
  }

  static togglePlayer() {
    whiteToPlay = !whiteToPlay;
    document.querySelectorAll('.player-indicator')
      .forEach(el => el.classList.toggle('hidden'));
  }
}
