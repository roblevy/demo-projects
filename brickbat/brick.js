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
    function domElement() {
      const el = document.createElement('div');
      el.style.backgroundColor = brickColors[points];
      el.className = 'brick';
      return el;
    }
    super(x, y, brickWidth, brickHeight, domElement());
    this.points = parseInt(points) * 5;
    if(!parseInt(points)) {
      console.log('NaN?', this, 'points is', points);
    }
    this.livesLeft = parseInt(points);
  }

  hitByBall() {
    if(this.inGame) {
      addPoints(this.points);
      this.livesLeft --;
    }
    if(!this.livesLeft) {
      this.remove();
    }
  }
}


