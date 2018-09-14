/* global GameItem */
const powerupSpeed = 0.8;

class Powerup extends GameItem {
  constructor(x, y, width, height, cssClass) {
    super(x, y, width, height, `powerup ${cssClass}`);
    this.canMove = true;
    this.xVelocity(0);
    this.yVelocity(0);
  }

  release() {
    this.domElement.style.visibility = 'inherit';
    this.yVelocity(-powerupSpeed);
  }

  draw() {
    super.draw();
    this.checkPlayerCollisions();
  }

  applyPowerupTo(gameItem) {
    gameItem.addPowerup(this);
  }

  removePowerupFrom(gameItem) {}

  checkPlayerCollisions() {
    const players = gameItems.filter(gameItem => gameItem instanceof Player);
    const playersCollidedWith = this.collidesWith(players);
    playersCollidedWith.forEach(player => {
      this.applyPowerupTo(player);
    });
    if(playersCollidedWith.length) this.remove();
  }
}

class Extendabat extends Powerup {
  constructor(x, y) {
    super(x, y, 5, 5, 'extendabat');
    this.draw();
  }

  applyPowerupTo(gameItem) {
    gameItem.width *= 1.5;
    gameItem.setDomElementSize();
    super.applyPowerupTo(gameItem);
  }

  removePowerupFrom(gameItem) {
    gameItem.width /= 1.5;
    gameItem.setDomElementSize();
    super.removePowerupFrom(gameItem);
  }
}

class Laser extends Powerup {
  constructor(x, y) {
    super(x, y, 5, 5, 'lasers');
    this.draw();
  }

  applyPowerupTo(gameItem) {
    gameItem.domElement.classList.add('with-lasers');
    this.previousBeginAction = gameItem.beginAction;
    this.previousEndAction = gameItem.endAction;
    gameItem.beginAction = this.startFiring;
    gameItem.endAction = this.stopFiring;
    const laser = this;
    setTimeout(item => laser.removePowerupFrom(item), 3000, gameItem);
  }

  // TODO: This doesn't work
  removePowerupFrom(item) {
    item.beginAction = this.previousBeginAction;
    item.endAction = this.previousEndAction;
    this.remove();
  }

  startFiring() {
    new Bullet(this.x, this.y + 5);
    if(!this.firingInterval) {
      this.firingInterval = setInterval(function(item) {
        new Bullet(item.x, this.y + 5);
      }, 500, this);
    }
  }

  stopFiring() {
    clearInterval(this.firingInterval);
    this.firingInterval = null;
  }
}

class Bullet extends GameItem {
  constructor(x, y) {
    super(x, y, 1, 5, 'bullet');
    this.xVelocity(0);
    this.yVelocity(1);
    this.canMove = true;
    this.draw();
  }

  move() {
    const bricks = gameItems.filter(item => item instanceof Brick);
    const hitBricks = this.collidesWith(bricks);
    this.destroyBricks(hitBricks);
    super.move();
  }

  destroyBricks(bricks) {
    if(bricks) {
      bricks.forEach(brick => {
        brick.wasHit();
        this.remove();
      });
    }
  }
}

const powerups = {
  a: Extendabat,
  b: Laser
};
