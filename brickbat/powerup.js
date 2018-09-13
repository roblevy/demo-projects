/* global GameItem */
const powerupSpeed = 0.8;

class Powerup extends GameItem {
  constructor(x, y, width, height) {
    const domElement = document.createElement('div');
    domElement.style.display = 'none';
    domElement.style.height = 3;
    domElement.style.width = 3;
    super(x, y, width, height, domElement);
    this.canMove = true;
    this.xVelocity(0);
    this.yVelocity(0);
  }

  release() {
    this.domElement.style.display = null;
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
      console.log('collision with', player);
      this.applyPowerupTo(player);
    });
    if(playersCollidedWith.length) this.remove();
  }
}

class Extendabat extends Powerup {
  constructor(x, y) {
    super(x, y, 5, 5);
    this.domElement.style.backgroundColor = 'pink';
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
    super(x, y, 5, 5);
    this.domElement.style.backgroundColor = 'yellow';
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
    console.log('laser', this, 'item', item);
    item.beginAction = this.previousBeginAction;
    item.endAction = this.previousEndAction;
    this.remove();
  }

  startFiring() {
    new Bullet(this.x, this.y);
    if(!this.firingInterval) {
      this.firingInterval = setInterval(function(item) {
        new Bullet(item.x, item.y);
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
    const domElement = document.createElement('div');
    domElement.style.backgroundColor = 'grey';
    super(x, y, 1, 5, domElement);
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
