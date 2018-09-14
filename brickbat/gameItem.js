/* global lib, gameItems */
/* eslint-disable no-unused-vars */
class GameItem {
  // TODO: Change domElement to className and just make a div for everything
  constructor(x, y, width, height, cssClass) {
    this.x = x;
    this.y = y;
    this.xV = 0;
    this.yV = 0;
    this.width = width;
    this.height = height;
    this.canMove = false;
    this.canDeflectBall = false;
    this.cssClass = cssClass;
    this.inGame = true;
    this.initialiseDomElement();
    gameItems.push(this);
  }

  initialiseDomElement() {
    const domElement = document.createElement('div');
    domElement.className = `gameItem ${this.cssClass}`;
    domElement.style.position = 'absolute';
    this.setDomElementSizeAndPosition(domElement);
    document.getElementById('game').appendChild(domElement);
    this.domElement = domElement;
  }

  setDomElementSizeAndPosition(el) {
    el.style.width = `${this.width}%`;
    el.style.height = `${this.height}%`;
    el.left = this.x;
    el.top = this.y;
  }

  draw() {
    const top = 100 - this.y - this.height;
    this.domElement.style.top = `${top}%`;
    this.domElement.style.left = `${this.x}%`;
    if(top > 100) {
      this.remove();
    }
  }

  remove() {
    if(this.inGame) {
      this.inGame = false;
      if(this.domElement) {
        this.domElement.remove();
      }
      gameItems.splice(gameItems.indexOf(this), 1);
    }
  }

  xVelocity(v) {
    if (v === undefined) return this.xV;
    this.xV = v;
  }

  yVelocity(v) {
    if (v === undefined) return this.yV;
    this.yV = v;
  }

  move() {
    if(this.yV || this.xV) {
      this.y += this.yV;
      this.x += this.xV;
      this.draw();
    }
  }

  collisionDirection(object) {
    const o1 = lib.dimensions(this);
    const o2 = lib.dimensions(object);
    const xOverlap = Math.max(0, Math.min(o1.r, o2.r) - Math.max(o1.l, o2.l));
    const yOverlap = Math.max(0, Math.min(o1.b, o2.b) - Math.max(o1.t, o2.t));
    if(xOverlap < yOverlap) return 'x';
    return 'y';
  }

  collidesWithObject(object) {
    const o1 = lib.dimensions(this);
    const o2 = lib.dimensions(object);
    const collides = ((o1.r > o2.l) && (o1.l < o2.r))
      && ((o1.t < o2.b) && (o1.b > o2.t));
    return collides;
  }

  collidesWith(arrayOfObjects) {
    return arrayOfObjects.filter(object => this.collidesWithObject(object));
  }

  wasHit() {
    // Do nothing by default
  }
}
