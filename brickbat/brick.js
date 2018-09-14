/* global lib, GameItem, addPoints */
/* eslint-disable no-unused-vars */
let brickWidth = 5;
let brickHeight = 2;

const brickColors = {
  '1': 'green',
  '2': 'yellow',
  '3': 'red',
  '4': 'grey'
};

class Brick extends GameItem {
  constructor(x, y, points) {
    super(x, y, brickWidth, brickHeight, 'brick');
    this.points = parseInt(points) * 5;
    if(!parseInt(points)) {
      console.log('NaN?', this, 'points is', points);
    }
    this.canDeflectBall = true;
    this.livesLeft = parseInt(points);
    this.powerups = [];
    this.draw();
  }

  wasHit() {
    if(this.inGame) {
      addPoints(this.points);
      this.livesLeft --;
    }
    if(!this.livesLeft) {
      this.break();
    }
  }

  break() {
    this.remove();
    this.powerups.forEach(powerup => {
      console.log('Release a powerup', powerup);
      powerup.release();
    });
  }

  addPowerup(type) {
    if(type) {
      const powerup = new powerups[type](this.x, this.y); /* global powerups */
      this.powerups.push(powerup);
    }
  }
}
