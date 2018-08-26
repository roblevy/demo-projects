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
    this.checkPlayerCollisions();
    super.draw();
  }

  applyPowerupTo(gameItem) {}
  removePowerupFrom(gameItem) {}

  checkPlayerCollisions() {
    const players = gameItems.filter(gameItem => gameItem instanceof Player);
    this.collidesWith(players).forEach(player => {
      console.log('collision');
      player.addPowerup(this);
      this.applyPowerupTo(player);
      this.remove();
    })
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

const powerups = {
  a: Extendabat
};
