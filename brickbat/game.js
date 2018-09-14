/* eslint-disable no-unused-vars prefer-const */
/* global Player, Ball, Brick, brickHeight, brickWidth, lib */
const gameSpeed = 1000 / 60;
const logDiv = document.getElementById('header');
const scoreDiv = document.getElementById('score');
let gameRunning = false;

let gameClockInterval;
const gameItems = [];
let logMessage = '';

let level = 1;
let points = 0;

let player1;

function startClock() {
  gameRunning = true;
  return setInterval(function() {
    tickGame();
    log(logMessage);
  }, gameSpeed);
}

function buildLevelBricks(levelNumber) {
  lib.csv('/levels/level' + lib.pad(levelNumber, 2) + '.csv')
    .then(res => {
      res.forEach((row, i) => {
        row.forEach((brickData, j) => {
          createBrick(i, j, brickData);
        });
      });
    });
}

function createBrick(i, j, brickData) {
  // i and j are the grid position of the brick.
  // brickData is, e.g. 2b
  // score of 2, powerup type b.
  const brickScore = brickData[0];
  const powerupType = brickData[1];
  if(brickScore !== '0') {
    const x = j * (brickWidth + 0.5);
    const y = i * (brickHeight + 0.5) + 80;
    const brick = new Brick(x, y, brickScore);
    brick.addPowerup(powerupType);
  }
}

function prepareLevel(levelNumber) {
  stopGame();
  gameItems.forEach(item => item.remove());
  while(gameItems.length) gameItems.pop();

  buildLevelBricks(levelNumber);
  player1 = new Player(20, 10);
  gameItems.push(player1);
  new Ball(ballStartX, ballStartY, ballVelocityX, ballVelocityY);
}

function stopGame() {
  gameRunning = false;
  clearInterval(gameClockInterval);
}

function tickGame() {
  drawItems();
  moveItems();
  if(levelComplete()) {
    nextLevel();
  }
}

function drawItems() {
  gameItems.forEach(gameItem => gameItem.draw());
}

function moveItems() {
  gameItems.forEach(gameItem => {
    if(gameItem.canMove) {
      if(gameItem.xVelocity() || gameItem.yVelocity()) {
        gameItem.move();
      }
    }
  });
}

function levelComplete() {
  return !gameItems.filter(item => item instanceof Brick).length;
}

function addPoints(toAdd) {
  points += toAdd;
  flashScore();
}

function flashScore() {
  scoreDiv.classList.add('flash');
  setTimeout(function() {
    scoreDiv.classList.remove('flash');
  }, 200);
}

function log() {
  logDiv.textContent = logMessage;
  scoreDiv.innerText = points;
}

document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case ' ':
      if(!gameRunning) {
        gameClockInterval = startClock();
      }
      break;
    case 'n':
      nextLevel();
      break;
    case 'Escape':
      stopGame();
  }
});

function nextLevel() {
  console.log('Completed level ' + level);
  level++;
  prepareLevel(level);
}

// TODO: This needs refactoring
function loseLife() {
  player1.loseLife();
  stopGame();
  if(player1.lives >= 0) {
    console.log('Lost a life! ' + player1.lives + ' lives remaining')
    new Ball(ballStartX, ballStartY, ballVelocityX, ballVelocityY);
  }
}

prepareLevel(1);
