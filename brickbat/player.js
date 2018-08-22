/* global lib, GameItem */
/* eslint-disable no-unused-vars */
let playerWidth = 10;
let playerHeight = 3;
let playerSpeed = 1;

class Player extends GameItem {
  constructor(x, y) {
    function domElement() {
      const el = document.createElement('div');
      el.style.backgroundColor = 'blue';
      el.className = 'player';
      return el;
    }
    super(x, y, playerWidth, playerHeight, domElement());
    this.canMove = true;
    this.moving = { l: false, r: false }; // Which direction(s) are we moving?
    this.addKeyListeners();
  }

  addKeyListeners() {
    const _this = this;
    document.addEventListener('keydown', function(event) {
      switch(event.key) {
        case 'a':
          _this.moving.l = true;
          break;
        case 'd':
          _this.moving.r = true;
          break;
      }
      setVelocity();
    });
    document.addEventListener('keyup', function(event) {
      switch(event.key) {
        case 'a':
          _this.moving.l = false;
          break;
        case 'd':
          _this.moving.r = false;
          break;
      }
      setVelocity();
    });

    function setVelocity() {
      if(_this.moving.l && _this.moving.r) {
        // Movement is unaffected
        return null;
      }
      if(_this.moving.l) {
        _this.xVelocity(-playerSpeed);
      } else if(_this.moving.r) {
        _this.xVelocity(playerSpeed);
      } else {
        _this.xVelocity(0);
      }
    }
  }
}
