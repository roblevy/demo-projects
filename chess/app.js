/* global Board, Square, King, Queen, Bishop, Knight, Rook, Pawn */
const board = new Board();
function sq(name) {
  return board.sq(name);
}
const white = [];
const black = [];
for (const side of [
  { colour: 'white', array: white, pieceRow: 1, pawnRow: 2 },
  { colour: 'black', array: black, pieceRow: 8, pawnRow: 7 }
]) {
  addPiece(side, Rook, 1);
  addPiece(side, Knight, 2);
  addPiece(side, Bishop, 3);
  addPiece(side, Queen, 4);
  addPiece(side, King, 5);
  addPiece(side, Bishop, 6);
  addPiece(side, Knight, 7);
  addPiece(side, Rook, 8);
  for (let i = 0; i < 8; i++) {
    const column = 'ABCDEFGH'[i];
    side.array.push(new Pawn(column + side.pawnRow, side.colour));
  }
}

function addPiece(side, piece, column) {
  const columnLetter = 'ABCDEFGH'[column - 1];
  side.array.push(new piece(columnLetter + side.pieceRow, side.colour));
}
