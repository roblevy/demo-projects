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

function startClock() {
  return setInterval(function() {
    tickGame();
    log(logMessage);
  }, gameSpeed);
}

function createLevel(levelNumber) {
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

function startLevel(levelNumber) {
  while(gameItems.length) {
    gameItems.forEach(item => item.remove());
  }

  createLevel(levelNumber);
  gameItems.push(new Player(20, 10));
  new Ball(ballStartX, ballStartY, ballVelocityX, ballVelocityY);
  clearInterval(gameClockInterval);
  gameClockInterval = startClock();
}

function tickGame() {
  moveItems();
  if(levelComplete()) {
    nextLevel();
  }
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
        gameRunning = true;
        startLevel(level);
      }
      break;
    case 'n':
      nextLevel();
      break;
  }
});

function nextLevel() {
  level++;
  startLevel(level);
}
