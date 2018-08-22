/* global GameItem, Player, gameItems, logMessage */
/* eslint-disable no-unused-vars */
const ballDiameter = 3;

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
  }

  draw() {
    this.checkBoundaries();
    this.checkCollisions();
    super.draw();
  }

  checkBoundaries() {
    if(this.x <=0 || this.x > 100) this.bounceX();
    if(this.y >= 100) this.bounceY();
  }

  bounceX() {
    this.xVelocity(-this.xV);
  }

  bounceY() {
    this.yVelocity(-this.yV);
  }

  checkCollisions() {
    const otherItems = gameItems.filter(item => !(item instanceof Ball));
    const collidesWith = this.collidesWith(otherItems);
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
    const acceleration = this.xV < 0 ? 1 - accelerationFraction : 1 + accelerationFraction;
    this.xV *= acceleration;
  }

}

