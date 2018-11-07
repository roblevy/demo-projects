let selectedSquare;

function handleSquareClick(square) {
  return function() {
    if (square.piece && !selectedSquare) {
      square.piece.availableSquares().forEach(sq => sq.highlight());
      selectedSquare = square;
    } else if (selectedSquare && selectedSquare.piece) {
      selectedSquare.piece.moveTo(square);
      selectedSquare = null;
    }
  };
}
