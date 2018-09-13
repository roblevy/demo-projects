/* global GameItem, Player, gameItems, logMessage */
/* eslint-disable no-unused-vars */
const ballDiameter = 3;
const ballStartX = 20;
const ballStartY = 20;
const ballVelocityX = 0.7;
const ballVelocityY = 1.3;
const playerSteerFactor = 0.4; // How much can the bat 'steer' the ball

class Ball extends GameItem {
  constructor(x, y, xVelocity, yVelocity) {
    function domElement() {
      const el = document.createElement('div');
      el.style.backgroundColor = 'red';
      el.className = 'ball';
      return el;
    }
    super(x, y, ballDiameter, ballDiameter, domElement());
    this.canMove = true;
    this.xVelocity(xVelocity);
    this.yVelocity(yVelocity);
    this.draw();
  }

  draw() {
    super.draw();
  }

  move() {
    this.checkBoundaries();
    this.checkCollisions();
    super.move();
  }

  checkBoundaries() {
    if(this.x <=0 || (this.x + ballDiameter) > 100) this.bounceX();
    if(this.y >= 100) this.bounceY();
    if(this.inGame) {
      if(this.y < 0) {
        this.ballIsLost();
      }
    }
  }

  bounceX() {
    this.xVelocity(-this.xV);
  }

  bounceY() {
    this.yVelocity(-this.yV);
  }

  ballIsLost() {
    // TODO: Consider refactoring this. Whose job should this be?
    this.inGame = false;
    loseLife(); // TODO: Refactor
    this.remove();
  }

  checkCollisions() {
    const otherItems = gameItems.filter(item => !(item instanceof Ball));
    const canDeflectBall = otherItems.filter(item => item.canDeflectBall);
    const collidesWith = this.collidesWith(canDeflectBall);
    const collisionDirections = [];
    collidesWith.forEach(collidedObject => {
      collisionDirections.push(this.collisionDirection(collidedObject));
      collidedObject.wasHit();
      if(collidedObject instanceof Player) {
        this.playerCollision(collidedObject);
      }
    });
    if (collisionDirections.includes('x')) this.bounceX();
    if (collisionDirections.includes('y')) this.bounceY();
  }

  playerCollision(player) {
    const ballCentre = this.x + ( this.width / 2 );
    const playerCentre = player.x + (player.width / 2);
    const accelerationFraction = (ballCentre - playerCentre) / player.width;
    this.xV += (accelerationFraction * playerSteerFactor);
  }

}
