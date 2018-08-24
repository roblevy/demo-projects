/* global GameItem */
const powerupSpeed = 0.8;

class Powerup extends GameItem {
  constructor(x, y, width, height, domElement) {
    domElement.style.display = 'none';
    super(x, y, width, height, domElement);
    this.canMove = true;
    this.xVelocity(0);
    this.yVelocity(0);
  }

  release() {
    this.domElement.style.display = null;
    this.yVelocity(-powerupSpeed);
    console.log('Releasing powerup', typeof this, 'ySpeed', this.yVelocity());
  }
}

class Extendabat extends Powerup {
  constructor(x, y) {
    const domElement = document.createElement('div');
    domElement.style.height = 5;
    domElement.style.width = 5;
    domElement.style.backgroundColor = 'pink';
    super(x, y, 5, 5, domElement);
  }
}

const powerups = {
  a: Extendabat
};
