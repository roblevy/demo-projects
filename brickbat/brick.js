/* global lib, GameItem, addPoints */
/* eslint-disable no-unused-vars */
let brickWidth = 5;
let brickHeight = 2;

class Brick extends GameItem {
  constructor(x, y, points) {
    function domElement() {
      const el = document.createElement('div');
      el.style.backgroundColor = 'green';
      el.className = 'brick';
      return el;
    }
    super(x, y, brickWidth, brickHeight, domElement());
    this.points = points || 5;
  }

  hitByBall() {
    if(this.inGame) {
      addPoints(this.points);
    }
    this.remove();
  }
}


