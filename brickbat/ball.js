/* global GameItem, Player, gameItems, logMessage */
/* eslint-disable no-unused-vars */
const ballDiameter = 3;
const ballStartX = 25;
const ballStartY = 40;
const ballVelocityX = 0.7;
const ballVelocityY = 0.9;

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
  }

  bounceX() {
    console.log('bounce!');
    this.xVelocity(-this.xV);
  }

  bounceY() {
    this.yVelocity(-this.yV);
  }

  checkCollisions() {
    const otherItems = gameItems.filter(item => !(item instanceof Ball));
    const canDeflectBall = otherItems.filter(item => item.canDeflectBall);
    const collidesWith = this.collidesWith(canDeflectBall);
    const collisionDirections = [];
    collidesWith.forEach(collidedObject => {
      collisionDirections.push(this.collisionDirection(collidedObject));
      collidedObject.hitByBall();
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
    this.xV += accelerationFraction;
  }

}
