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
const ballStartX = 25;
const ballStartY = 40;
let points = 0;

function startClock() {
  return setInterval(function() {
    tickGame();
    log(logMessage);
  }, gameSpeed);
}

function createLevel(levelNumber) {
  if (levelNumber < 10) levelNumber = '0' + levelNumber; 
  lib.csv('/levels/level' + levelNumber + '.csv')
    .then(res => {
      console.log('loading level', res);
      res.forEach((row, i) => {
        row.forEach((brickScore, j) => {
          if(brickScore !== '0') {
            const x = j * (brickWidth + 0.5);
            const y = i * (brickHeight + 0.5) + 80;
            gameItems.push(new Brick(x, y, brickScore));
          }
        });
      });
    });
}

function startLevel(levelNumber) {
  gameItems.forEach(item => item.remove());
  // empty(gameItems);
  createLevel(levelNumber);
  gameItems.push(new Player(20, 30));
  gameItems.push(new Ball(ballStartX, ballStartY, 0.7, 0.5));
  clearInterval(gameClockInterval);
  gameClockInterval = startClock();
}

function tickGame() {
  gameItems.forEach(gameItem => {
    if(gameItem.canMove) {
      if(gameItem.xVelocity() || gameItem.yVelocity()) {
        gameItem.move();
      }
    }
  });
}

function addPoints(toAdd) {
  points += toAdd;
}

function log() {
  logDiv.textContent = logMessage;
  scoreDiv.innerText = points;
}

function empty(arr) {
  arr.splice(0, arr.length);
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
      level++;
      startLevel(level);
      break;
  }
});
