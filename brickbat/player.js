/* global lib, GameItem */
/* eslint-disable no-unused-vars */
let playerWidth = 15;
let playerHeight = 10;
let playerSpeed = 1;

class Player extends GameItem {
  constructor(x, y) {
    super(x, y, playerWidth, playerHeight, 'player');
    this.lives = 5;
    this.powerups = [];
    this.canMove = true;
    this.canDeflectBall = true;
    this.moving = { l: false, r: false }; // Which direction(s) are we moving?
    this.addKeyListeners();
    this.draw();
  }

  draw() {
    super.draw();
  }

  addPowerup(powerup) {
    if(!this.powerups.includes(powerup)) {
      console.log('powerup!', powerup);
      this.powerups.push(powerup);
    }
  }

  removePowerup(powerup) {
    this.powerups.splice(this.powerups.indexOf(powerup), 1);
  }

  loseLife() {
    this.lives -= 1;
    if(this.lives < 0) {
      alert('game over!');
      level = 0;
      nextLevel();
    }
  }

  addKeyListeners() {
    const _this = this;
    document.addEventListener('keydown', function(event) {
      switch(event.key) {
        case 'a':
          _this.moving.l = true;
          break;
        case 'l':
          _this.moving.r = true;
          break;
        case 'j':
          _this.beginAction();
          break;
      }
      setVelocity();
    });
    document.addEventListener('keyup', function(event) {
      switch(event.key) {
        case 'a':
          _this.moving.l = false;
          break;
        case 'l':
          _this.moving.r = false;
          break;
        case 'j':
          _this.endAction();
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

  beginAction() {}

  endAction() {}
}
