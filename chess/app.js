/* global Board, Square, King, Queen, Pawn */
const board = new Board();
function sq(name) {
  return board.sq(name);
}
const white = [];
const black = [];
white.push(new King('E1', 'white'));
white.push(new Queen('D1', 'white'));
white.push(new Pawn('C2', 'white'));
white.push(new Pawn('D2', 'white'));
white.push(new Pawn('E5', 'white'));
black.push(new Pawn('C3', 'black'));
black.push(new Pawn('G4', 'black'));
