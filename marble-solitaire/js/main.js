/* global board, boardHistory */
buildBoard();

function buildBoard() {
  const boardDiv = divOfClass('board');
  board.forEach((row, rowIndex) => {
    const rowDiv = divOfClass('row');
    row.forEach((cell, cellIndex) => {
      const cellDiv = divOfClass('cell');
      cellDiv.setAttribute('row', rowIndex);
      cellDiv.setAttribute('cell', cellIndex);
      setCellClass(cellDiv, rowIndex, cellIndex);
      rowDiv.appendChild(cellDiv);
    });
    boardDiv.appendChild(rowDiv);
  });
  document.getElementById('root').appendChild(boardDiv);
  setEventListeners();
}

function setEventListeners() {
  document.querySelectorAll('.cell')
    .forEach(cell => {
      // Remove all event listeners
      cell.removeEventListener('click', handleCellClick);
      cell.removeEventListener('click', handleAwaitingCellClick);
    });
  document.querySelectorAll('.marble')
    .forEach(marble => {
      marble.addEventListener('click', handleCellClick);
    });
}

function divOfClass(className) {
  const div = document.createElement('div');
  div.className = className;
  return div;
}

function setCellClass(cell) {
  const [rowIndex, cellIndex] = getCellIndices(cell);
  switch(board[rowIndex][cellIndex]) {
    case 0: // inaccessible
      cell.classList = 'cell inaccessible';
      break;
    case 1: // marble
      cell.classList = 'cell marble';
      break;
    case 2: // empty
      cell.classList = 'cell empty';
      break;
    case 3: // awaiting jump options
      cell.classList = 'cell marble awaiting';
      break;
    case 4: // jump option
      cell.classList = 'cell empty jump-option';
      break;
  }
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => setCellClass(cell));
  setEventListeners();
}

function handleCellClick(event) {
  const clickedDiv = event.target;
  if (boardAtDivPosition(clickedDiv) === 1) {
    // Clicked on a marble
    updateBoard();
    const jumpOptions = jumpablePositions(clickedDiv);
    if (jumpOptions.length === 1) {
      const jumpDestinationCell = jumpOptions[0][1];
      jump(clickedDiv, jumpDestinationCell);
    } else if (jumpOptions.length > 1) {
      setBoardAtDivPosition(clickedDiv, 3); // Awaiting jump options
      updateBoard();
      createJumpOptions(jumpOptions);
    } else {
      // Clicked somewhere invalid
      const board = document.querySelector('.board');
      board.classList.add('error');
      setTimeout(() => board.classList.remove('error'), 300);
    }
  }
}

// origin, jumpOver and destination are all divs
function jump(origin, destination) {
  console.log('Jumping from', origin, 'to', destination);
  const oldBoard = [];
  board.forEach(row => {
    oldBoard.push(row.slice());
  });
  boardHistory.push(oldBoard);
  // Set current cell to empty
  setBoardAtDivPosition(origin, 2);
  // Set jumped cell to empty
  const jumpOver = jumpOverCell(origin, destination);
  setBoardAtDivPosition(jumpOver, 2);
  // Set jump destination to contain a marble
  setBoardAtDivPosition(destination, 1);
  updateBoard();
}

function getCellIndices(div) {
  const rowIndex = div.getAttribute('row');
  const cellIndex = div.getAttribute('cell');
  return [parseInt(rowIndex), parseInt(cellIndex)];
}

function setBoardAtDivPosition(div, setTo) {
  board[div.getAttribute('row')][div.getAttribute('cell')] = setTo;
}

function boardAtDivPosition(div) {
  return board[div.getAttribute('row')][div.getAttribute('cell')];
}

function divAtBoardPosition(row, cell) {
  return document.querySelector(`.cell[row="${row}"][cell="${cell}"]`);
}

// We are looking for a marble followed by an empty space
// Returns an array of locations the marble at position `div` can jump to.
// Each element is an array with the neighbouring square first
// and the cell being jumped to second.
function jumpablePositions(div) {
  const boardSize = board.length;
  const [row, cell] = getCellIndices(div);
  const jumpable = [];
  if ((cell < (boardSize - 2)) && positionHasMarble(row, cell + 1) && positionIsEmpty(row, cell + 2)) {
    // To the left?
    jumpable.push([
      divAtBoardPosition(row, cell + 1),
      divAtBoardPosition(row, cell + 2)
    ]);
  }
  if ((cell > 1) && positionHasMarble(row, cell - 1) && positionIsEmpty(row, cell - 2)) {
    // To the right?
    jumpable.push([
      divAtBoardPosition(row, cell - 1),
      divAtBoardPosition(row, cell - 2)
    ]);
  }
  if ((row > 1) && positionHasMarble(row - 1, cell) && positionIsEmpty(row - 2, cell)) {
    // above?
    jumpable.push([
      divAtBoardPosition(row - 1, cell),
      divAtBoardPosition(row - 2, cell)
    ]);
  }
  if ((row < (boardSize - 2)) && positionHasMarble(row + 1, cell) && positionIsEmpty(row + 2, cell)) {
    // below?
    jumpable.push([
      divAtBoardPosition(row + 1, cell),
      divAtBoardPosition(row + 2, cell)
    ]);
  }
  return jumpable;
}

// Find the cell which is between the origin
// cell and the destination cell
function jumpOverCell(origin, destination) {
  const [originRow, originCell] = getCellIndices(origin);
  const [destinationRow, destinationCell] = getCellIndices(destination);
  const jumpOverRow = Math.round((originRow + destinationRow) / 2);
  const jumpOverCell = Math.round((originCell + destinationCell) / 2);
  return divAtBoardPosition(jumpOverRow, jumpOverCell);
}

function createJumpOptions(jumpable) {
  // Remove all marble click handlers
  const marbles = document.querySelectorAll('.marble');
  marbles.forEach(marble => marble.removeEventListener('click', handleCellClick));
  // Add awaiting listener
  const awaiting = document.querySelector('.awaiting');
  awaiting.addEventListener('click', handleAwaitingCellClick);
  jumpable.map(cellArray => cellArray[1]).forEach(emptySpace => {
    setBoardAtDivPosition(emptySpace, 4); // jump option
    emptySpace.addEventListener('click', handleJumpOptionClick);
  });
  updateBoard();
}

function positionIsEmpty(row, cell) {
  return board[row][cell] === 2;
}

function positionHasMarble(row, cell) {
  return board[row][cell] === 1;
}

function handleJumpOptionClick(event) {
  // Chosen a jump option
  clearJumpOptions();
  const originDiv = document.querySelector('.awaiting');
  const destinationDiv = event.target;
  jump(originDiv, destinationDiv);
  // Clear jump options
  updateBoard();
}

function handleAwaitingCellClick(event) {
  // Cancelled jump options
  clearJumpOptions();
  event.target.classList.remove('awaiting');
  setAllBoardCells(3, 1); // From awaiting jump options to marble
  setAllBoardCells(4, 2); // From jump option to empty
  updateBoard();
}

function clearJumpOptions() {
  // Clear jump options
  document.querySelectorAll('.jump-option').forEach(jumpOption => {
    jumpOption.classList.remove('jump-option');
    jumpOption.removeEventListener('click', handleJumpOptionClick);
  });
  setAllBoardCells(4, 2); // From jump option to empty
}

function setAllBoardCells(setFrom, setTo) {
  board.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      if (board[rowIndex][cellIndex] === setFrom) {
        board[rowIndex][cellIndex] = setTo;
      }
    })
  );
  updateBoard();
}

document.body.addEventListener('keydown', event => {
  if (event.key === 'z' && event.metaKey) {
    // cmd Z has been pressed!
    console.log('Undo!');
    const newBoard = boardHistory.pop();
    board = newBoard;
    updateBoard();
  }
})
