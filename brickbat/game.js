/* global Player, Ball, Brick, brickHeight, brickWidth */
const gameSpeed = 1000 / 60;
const logDiv = document.getElementById('header');
const scoreDiv = document.getElementById('score');

const gameClockInterval = setInterval(function() {
  tickGame();
  log(logMessage);
}, gameSpeed);

const gameItems = [];
let logMessage = '';

const ballStartX = 25;
const ballStartY = 40;
let points = 0;

gameItems.push(new Player(20, 30));
gameItems.push(new Ball(ballStartX, ballStartY, 0.7, 0.5));
for (let row = 0; row < 5; row++) {
  for(let col = 0; col < 18; col++) {
    gameItems.push(new Brick(col * (brickWidth + 0.5), row * (brickHeight + 0.5) + 70));
  }
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
